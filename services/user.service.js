const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const { genaretCode } = require("../helpers/accountValidationToken");
const { sendWelcomeMail } = require("../helpers/WelcomeMail");
const jwt = require("jsonwebtoken");
exports.registerUserService = async(userInfo) => {
        const {email} = userInfo;
        const user = await User?.findOne({ email })
        return  user;
}
exports.activateAccountService = async(token,id)=>{
    // console.log(token,id);
try {
    const user = jwt.verify(token, process.env.SECRET_TOKEN);
    // console.log(user);
    const check = await User.findById(id);
    // console.log(check);
    if(id !== user.id){
        throw new Error("You Don't Have The Authorization to Complete The Operation");
    }
    if (check.isverify == true) {
        throw new Error("Your Account Is Already Activated");
      }
    check.isverify = true;
    await check.save();
    return check;
} catch (error) {
    throw new Error("account activation failed");
}
}
exports.sendverificationAgainServices = async(id)=>{
    const user = await User.findById(id);
    return user;
}