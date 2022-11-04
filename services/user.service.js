const User = require("../Models/User");
exports.registerUserService = async(userInfo) => {
        const {email} = userInfo;
        // --------find user by email
        const user = await User?.findOne({ email })
        return user;
}
exports.activateAccountService = async(id)=>{

    const user= await User.findById(id);
    return user;
}
exports.sendVerificationEmailServices = async(id)=>{
    const user = await User.findById(id);
    return user;
}