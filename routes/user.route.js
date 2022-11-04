const router = require("express").Router();
const authUser = require("../helpers/authVerify")

// // init controller
 const userController = require("../controllers/user.controller");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", userController.register);
// @route POST api/users/activate
// @desc Activate user and send token
// @access private
router.post("/activate",authUser,userController.activateAccount);
// @route POST api/users/sendverification
// @send verification email again
// @access private
router.post("/sendVerification",authUser,userController.sendVerificationEmail);
// @route GET api/users/current
// @desc Return current user
// @access Private
router.get("/current",  userController.currentUser);

module.exports = router;