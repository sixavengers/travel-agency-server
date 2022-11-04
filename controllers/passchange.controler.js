const genaretCodeReset = require("../helpers/genaretCodeReset");
const { sendResetCodeEmail } = require("../helpers/sendResetCodeEmail");
const Code = require("../Models/Code");
const User = require("../Models/User");
const { findUserServices } = require("../services/user.service");

const findUser = async(req,res)=>{
    try {
      const user = await findUserServices.findUserServices(req.body);
      if(!user){
        return res.status(400).json({ messages: "User Not Found" });
      }
      res.status(200).json({ messages: "User Found",user:user });
    } catch (error) {
      res.status(500).json({ messages: error?.messages });
    }
  }
  const sendResetPasswordCode = async(req,res)=>{
    try {
      const {email} = req.body;
      // -----------------Find user by email and remove password-----------------
      const user = await User.findOne({email}).select("-password");
      // -----------------Check if user not found-----------------
      if(!user){
        return res.status(400).json({ messages: "User Not Found" });
      }
      // ------------------remove old code if exist-----------------
      await Code.findOneAndRemove({ user: user._id });
      const code = genaretCodeReset(5);
      // -----------------Create new code and save in database-----------------
      const SaveCode = await new Code({
        code,
        user: user._id,
      }).save();
      // -----------------Send reset code email-----------------
      sendResetCodeEmail(user.name,user.email,code,"Send Password Reset Code")
      return res.status(200).json({
        messages: "Email Reset Code Has Been Send To Your Email",
      });
    } catch (error) {
      res.status(500).json({ messages: error?.messages });
    }
  }
  const changesPassword = async(req,res)=>{
    
  }
    module.exports = {
        findUser,sendResetPasswordCode,changesPassword
    }