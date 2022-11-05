const User = require("../Models/User");
// ---------------Register User Service-----------------
exports.registerUserService = async(userInfo) => {
        const {email} = userInfo;
        // --------find user by email
        const user = await User?.findOne({ email })
        return user;
}
// ---------------Activate Account Service-----------------
exports.activateAccountService = async(id)=>{

    const user= await User.findById(id).select("-password");
    return user;
}
// -----------------send verification email-----------------
exports.sendVerificationEmailServices = async(id)=>{
    const user = await User.findById(id);
    return user;
}
exports.findUserServices = async({email})=>{
  const user = await User.findOne({email}).select("-password");
  return user;
}