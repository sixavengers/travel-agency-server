const {genaretCodeReset} = require("../helpers/genaretCodeReset");
const Code = require("../Models/Code");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const { findUserServices } = require("../services/user.service");
const { sendResetCodeEmail } = require("../helpers/WelcomeMail");

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
 const validateResetCode = async (req, res) => {
    try {
      const { email, code } = req.body;
    //   -----------------Find user by email-----------------
      const user = await User.findOne({ email });
    //   -----------------get db code with user id-----------------
      const dbcode = await Code.findOne({ user: user._id });
    //   if code is not valid return error
      if (dbcode.code !== code) {
        return res.status(400).json({
          messages: "Code Does Not Valid",
        });
      }
      return res.status(200).json({
        messages: "Code Valid",
      });
    } catch (error) {
      res.status(500).json({ messages: error?.messages });
    }
  };
//   -----------------Reset Password-----------------
  const changesPassword = async (req, res) => {
        try {
            // -----------------Get user email password from request body-----------------
          const { email, password } = req.body;
          const cryptedPassword = await bcrypt.hash(password, 12);
        //   -----------------Find user by email and update password-----------------
        const user=  await User.findOneAndUpdate(
            { email },
            {
              password: cryptedPassword,
            }
          );
          // ------------------if not found user return error-----------------
          if(!user){
            return res.status(400).json({ messages: "User Not Found" });
          }
          return res.status(200).json({
            messages: "password changed successfully",
          });
        } catch (error) {
          res.status(500).json({ messages: error?.messages });
        }
};
// -----------------Changes Password With Old Password-----------------
const changesPasswordWithOldPassword = async (req, res) => {
            try {
              const id = req.userData.id
              const user = await User.findById(id);
              const { oldpassword, newpassword } = req.body;
              // ---------Cheack if  password is the same as old password
              const isMatch = await bcrypt.compare(oldpassword, user.password);
              if (!isMatch) {
                return res.status(400).json({ messages: "Old Password Not Match" });
              }
              // -----------------Hash new password-----------------
              const cryptedPassword = await bcrypt.hash(newpassword, 12);
              // -----------------Update new password-----------------
              user.password = cryptedPassword;
              await user.save();
              return res.status(200).json({
                messages: "password changed successfully",
              })
            } catch (error) {
              res.status(500).json({ messages: error?.messages });
            }
}
const updateProfile = async (req, res) => {
  try {
    const id = req.userData.id
   const user = await User.findById(id).select("-password -_id -tourInfo -isverify -profileImg -avatar -role");
   
  } catch (error) {
    res.status(500).json({ messages: error?.messages });
  }
}
    module.exports = {
        findUser,sendResetPasswordCode,changesPassword,validateResetCode,changesPasswordWithOldPassword,
        updateProfile
    }