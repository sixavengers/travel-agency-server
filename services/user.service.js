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
      return res.status(400).json({
        messages: "This email is already Exists Try Another One",
      });
    }
    const hastPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
        email,
        password: hastPassword,
        ...userInfo
    });
    const emailVerificationToken = genaretCode({ id: user._id.toString() }, "30m");
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    // send email
sendWelcomeMail(user?.name,email,url)
const token = genaretCode({ id: user._id.toString() }, "7d");
    return { user, token };
    } catch (error) {
        throw error;
    }
}
