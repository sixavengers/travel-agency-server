const userServices = require('../services/user.service');
/* Register User */
const register = async (req, res) => {
   try {
    const user = await userServices.registerUserService(req.body)
    if(!user){
      return res.status(400).send({success:false,message:"User Can't Be Created"});
    }
    res.send({ success: true, message: "User Created Successfully Please Check Your Email To Activate Your Account",user:user.user,token:user.token });
    ;
   } catch (error) {
     res.status(500).send({ success: false, message: error?.message });
   }
};
// ------Account Activate
const activateAccount = async(req,res)=>{
   try {
    const id = req.userData.id
    const {token} = req.body;
    const user = await userServices.activateAccountService(token,id);
    if(!user){
      return res.status(400).send({success:false,message:"Invalid Token"});
    }
    res.send({ success: true, message: "Account Activated Successfully",user:user.user});
   } catch (error) {
    res.status(500).send({ success: false, message: error?.message });
   }
}
/* Login User */
const login = async (req, res) => {
  res.send({ success: true, message: "Login User" });
};

/* Current User */
const currentUser = async (req, res) => {
  res.send({ success: true, message: "Current User" });
};

// exports
module.exports = { register, currentUser, login,activateAccount };
