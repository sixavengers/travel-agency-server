const { genaretCode } = require('../helpers/accountValidationToken');
const { sendActivateAcountMail } = require('../helpers/sendActivateAcountMail');
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
      return res.status(400).send({success:false,message:"Something Went Wrong"});
    }
    res.send({ success: true, message: "Account Activated Successfully",user:user});
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
// send verification email again
const sendVerification = async(req,res)=>{
  try {
    const id = req.user.id;
    const user = await userServices.sendverificationAgainServices(id);
    if (user.verified === true) {
      return res
        .status(400)
        .json({ messages: "This account is already verified" });
    }
    const emailvarificationToken = genaretCode(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailvarificationToken}`;
    sendActivateAcountMail(user?.email, user?.first_name, url);
    return res.status(200).json({
      messages: "Email Verification Link has been sent to your email",
    });
  } catch (error) {
    res.status(500).json({ messages: error?.messages });
  }
}
// exports
module.exports = { register, currentUser, login,activateAccount,sendVerification };
