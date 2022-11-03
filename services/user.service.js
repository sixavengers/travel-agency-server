const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { genaretCode } = require("../helpers/accountValidationToken");
const { sendWelcomeMail } = require("../helpers/WelcomeMail");
exports.registerUserService = async(userInfo) => {
    try {
        const {
            email,
            password,
        } = userInfo;
        // check if user already exists
        const check = await User?.findOne({ email });
      if (check) {
      throw new Error("This email is already Exists Try Another One");
    }
    const hashPassword = await bcrypt.hash(password, 12);
    console.log(hashPassword);
    const user = await User.create({
        email,
        password: hashPassword,
        ...userInfo
    });
    const emailVerificationToken = genaretCode({ id: user._id.toString() }, "30m");
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    // send email
    console.log(user.email,emailVerificationToken,url);
sendWelcomeMail(user?.name,user.email,url)
const token = genaretCode({ id: user._id.toString() }, "7d");
    return { user, token };
    } catch (error) {
        throw error;
    }
}
