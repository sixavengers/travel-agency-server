const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const { genaretCode } = require("../helpers/accountValidationToken");
const { sendWelcomeMail } = require("../helpers/WelcomeMail");
const jwt = require("jsonwebtoken");
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
    const user = await User.create({
        ...userInfo,
        password: hashPassword,
      
    });
    const emailVerificationToken = genaretCode({ id: user._id.toString() }, "30m");
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
sendWelcomeMail(user?.name,user.email,url)
const token = genaretCode({ id: user._id.toString() }, "7d");
    return { user, token };
    } catch (error) {
        throw error;
    }
}
exports.activateAccountService = async(token,id)=>{
    // console.log(token,id);
try {
    const user = jwt.verify(token, process.env.SECRET_TOKEN);
    // console.log(user);
    const check = await User.findById(id);
    // console.log(check);
    if(id !== user.id){
        throw new Error({message:"You Don't Have The Authorization to Complete The Opeeation"});
    }
    if (check.isverify == true) {
        throw new Error({message:"Your Account Is Already Activated"});
      }
    check.isverify = true;
    await check.save();
    return check;
} catch (error) {
    throw new Error({message:"account activation failed"});
}
}