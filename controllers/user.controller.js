const { sendWelcomeMail } = require('../helpers/WelcomeMail');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../Models/User');
const userServices = require('../services/user.service');
const { genaretCode } = require('../helpers/genaretCodeReset');
/* Register User */
const register = async (req, res) => {
   try {
    // -----------------Get user info from request body-----------------
    const user = await userServices.registerUserService(req.body)
    // -----------------Check if user already exist-----------------
    if (user) {
      return res.status(400).send({success:false,message:"User Already Exists"});
    }
    const {password} = req.body;
    // -------------hash password----------------
    const hashPassword = await bcrypt.hash(password, 12);
    // -----------------Create new user------------------
    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
      
    });
    // -----------------Generate email verification token-----------------
    const emailVerificationToken =  genaretCode({ id: newUser._id.toString() }, "30m");
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    // -----------------Send welcome email-----------------
   sendWelcomeMail(newUser?.name,newUser?.email,url,"Welcome To Travel Agency");
  //  -----------------Create and assign token-----------------
   const token = genaretCode({ id: newUser._id.toString() }, "7d");
    if(!newUser){
      return res.status(400).send({success:false,message:"User Can't Be Created"});
    }
    res.send({ success: true, message: "User Created Successfully Please Check Your Email To Activate Your Account",user:newUser,token:token });
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
    // -----------------Check if token is valid-----------------
    const userByid = jwt.verify(token, process.env.SECRET_TOKEN);
    // -----------------Check if user already verified-----------------
    const user = await userServices.activateAccountService(id);
    if(!user){
      // -----------------If user not found-----------------
      return res.status(400).json({ messages: "User Not Found" });
    }
    // -----------------Check user valid or not-----------------
    if(id !== userByid.id){
      return res.status(400).json({ messages:("You Don't Have The Authorization to Complete The Operation")});
  }
  if (user.isverify === true) {
    return res.status(400).json("Your Account Is Already Activated");
    }
    user.isverify = true;
   await user.save();
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
const sendVerificationEmail = async(req,res)=>{
  try {
    // -----------------Get user id from token-----------------
    const id = req.userData.id;
    // -----------------Find user by id-----------------
    const user = await userServices.sendVerificationEmailServices(id);
    if (user.isverify === true) {
      return res.status(400).json({ messages: "This account is already verified" });
    }
    // -----------------Generate email verification token-----------------
    const emailvarificationToken = genaretCode(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailvarificationToken}`;
    sendWelcomeMail(user?.name, user?.email, url,"resend verification email");
    return res.status(200).json({
      messages: "Email Verification Link has been sent to your email",
    });
  } catch (error) {
    res.status(500).json({ messages: error?.messages });
  }
}
// -----------------get all users-----------------
const users = async (req, res) => {
try {
  const id = req.userData.id;
  const user = await User.findById(id);
  // -----------------Check if requester is admin-----------------
  if (user.role !== "admin") {
    return res.status(400).json({ messages: "You Don't Have The Authorization to Complete The Operation" });
  }
  const users = await User.find({});
  res.send({ success: true, message: "All Users",users:users });
} catch (error) {
  res.status(500).json({ messages: error?.messages });
}
}
// -----------------get user by id-----------------
const userbyid = async (req, res) => {
  try {
    const requesterid = req.userData.id;
    const admin = await User.findById(requesterid);
    // -----------------Check if requester is admin-----------------
    if(admin.role !== "admin"){
      return res.status(400).json({ messages: "You Don't Have The Authorization to Complete The Operation" });
    }
    const {id} = req.params;
    // -----------------Find user by id-----------------
    const user = await User.findById(id).select("-password");
    if(!user){
      return res.status(400).json({ messages: "User Not Found" });
    }
    res.send({ success: true, message: "User By Id",user:user });
  } catch (error) {
    res.status(500).json({ messages: error?.messages });
    
  }
}
const changeRole = async(req,res)=>{
try {
  const requesterid = req.userData.id;
  const admin = await User.findById(requesterid);
   // -----------------Check if requester is admin-----------------
  if(admin.role !== "admin"){
    return res.status(400).json({ messages: "You Don't Have The Authorization to Complete The Operation" });
  }
  const {id} = req.params;
  // -----------------get role from body-----------------
  const {role} = req.body;
  // -----------------Cheack if role is valid-----------------
  if(role !== "admin" && role !== "user" && role !== "manager" && role !== "tour-guide"){
    return res.status(400).json({ messages: "Provide a valid role" });
  }
  // -----------------Find user by id-----------------
  const user = await User.findById(id);
  // -----------------Cheack this user already have this role-----------------
  if(user.role === role){
    return res.status(400).json({ messages: "This user already has this role" });
  }
  // -----------------Check if user found-----------------
  if(!user){
    return res.status(400).json({ messages: "User Not Found" });
  }
  // -----------------changes user role-----------------
  user.role=role;
  await user.save();
  res.send({ success: true, message: "User Role Changed Successfully",user:user });
} catch (error) {
  res.status(500).json({ messages: error?.messages });
}
}
// exports
module.exports = { register, currentUser, login,activateAccount,sendVerificationEmail,users,userbyid,changeRole};
