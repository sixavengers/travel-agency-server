const userServices = require('../services/user.service');
/* Register User */
const register = async (req, res) => {
   try {
    const user = await userServices.registerUserService(req.body)
    res.send({ success: true, message: "User Created Successfully Please Check Your Email To Activate Your Account",user:user.user,token:user.token });
    ;
   } catch (error) {
     res.status(500).send({ success: false, message: error?.message });
   }
};

/* Login User */
const login = async (req, res) => {
  res.send({ success: true, message: "Login User" });
};

/* Current User */
const currentUser = async (req, res) => {
  res.send({ success: true, message: "Current User" });
};

// exports
module.exports = { register, currentUser, login };
