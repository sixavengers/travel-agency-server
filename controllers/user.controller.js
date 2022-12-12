const { sendWelcomeMail } = require("../helpers/WelcomeMail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const userServices = require("../services/user.service");
const { genaretCode } = require("../helpers/genaretCodeReset");
/* Register User */
const register = async (req, res) => {
  try {
    const { password, name, email } = req.body;
    // -----------------Get user info from request body-----------------
    const user = await User.findOne({
      email,
    });

    // -----------------Check if user already exist-----------------
    if (user) {
      res.status(400).send({ success: false, message: "User Already Exists" });
      return;
    }

    // -------------hash password----------------
    const hashPassword = await bcrypt.hash(password, 12);

    // -----------------Create new user------------------
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    // -----------------Generate email verification token-----------------
    const emailVerificationToken = genaretCode(
      { id: newUser._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    // -----------------Send welcome email-----------------
    sendWelcomeMail(
      newUser?.name,
      newUser?.email,
      url,
      "Welcome To Travel Agency"
    );

    //  -----------------Create and assign token-----------------
    const token = genaretCode({ id: newUser._id.toString() }, "7d");
    await newUser.save();
    res.send({
      success: true,
      message:
        "User Created Successfully Please Check Your Email To Activate Your Account",
      user: newUser,
      token: token,
    });
  } catch (error) {
    res.status(500).send({ success: false, messages: error?.message });
  }
};
// ------Account Activate
const activateAccount = async (req, res) => {
  try {
    const id = req.userData.id;
    const { token } = req.body;
    // -----------------Check if token is valid-----------------
    const userByid = jwt.verify(token, process.env.SECRET_TOKEN);
    // -----------------Check if user already verified-----------------
    const user = await userServices.activateAccountService(id);
    if (!user) {
      return res.status(400).json({ messages: "User Not Found" });
    }
    // -----------------Check user valid or not-----------------
    if (id !== userByid.id) {
      return res.status(400).json({
        messages: "You Don't Have The Authorization to Complete The Operation",
      });
    }
    if (user.isverify === true) {
      return res.status(400).json("Your Account Is Already Activated");
    }
    user.isverify = true;
    await user.save();
    res.send({
      success: true,
      message: "Account Activated Successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).send({ success: false, messages: error?.message });
  }
};
/* Login User */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ messages: "Please Provide Email And Password" });
    }
    // -----------------Check if user exist-----------------
    const user = await userServices.loginUserService(email);
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found" });
    }
    // -----------------Check if password is correct-----------------
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ success: false, message: "Incorrect Password" });
    }
    // -----------------Create and assign token-----------------
    const token = genaretCode({ id: user._id.toString() }, "7d");
    const { password: pass, ...rest } = user.toObject();
    res.send({
      success: true,
      message: "Login Successfully",
      user: rest,
      token: token,
    });
  } catch (error) {
    res.status(500).send({ success: false, messages: error?.message });
  }
};

/* Current User */
const currentUser = async (req, res) => {
  const id = req.userData.id;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({ messages: "User Not Found" });
    }

    res.send({
      success: true,
      message: "User Found",
      user: user,
    });
  } catch (error) {
    res.status(500).send({ success: false, messages: error?.message });
  }
};
// send verification email again
const sendVerificationEmail = async (req, res) => {
  try {
    // -----------------Get user id from token-----------------
    const id = req.userData.id;
    // -----------------Find user by id-----------------
    const user = await userServices.sendVerificationEmailServices(id);
    if (user.isverify === true) {
      return res
        .status(400)
        .json({ messages: "This account is already verified" });
    }
    // -----------------Generate email verification token-----------------
    const emailvarificationToken = genaretCode(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailvarificationToken}`;
    sendWelcomeMail(user?.name, user?.email, url, "resend verification email");
    return res.status(200).json({
      messages: "Email Verification Link has been sent to your email",
    });
  } catch (error) {
    res.status(500).send({ success: false, messages: error?.message });
  }
};

// exports
module.exports = {
  register,
  currentUser,
  login,
  activateAccount,
  sendVerificationEmail,
};
