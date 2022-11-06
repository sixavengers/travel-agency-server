const router = require("express").Router();
const authUser = require("../helpers/authVerify")
// // init controller
 const userController = require("../controllers/user.controller");
 const passchangecontroler = require("../controllers/passchange.controler");
 const profile = require("../controllers/profile.controler");
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
// @route POST api/users/findser
// @desc user info by email
// @access Public
router.post("/finduser",passchangecontroler.findUser);
// @route get api/users/current
// @desc Return current user
// @access Private
router.get("/current",  userController.currentUser);
// @route POST api/users/sendResetPasswordCode
// @desc send reset password code
// @access Public
router.post('/sendResetPasswordCode',passchangecontroler.sendResetPasswordCode);
// @route POST api/users/validateResetCode
// @desc cheack reset password code
// @access Public
router.post('/validateResetCode',passchangecontroler.validateResetCode);
// @route POST api/users/changesPassword
// @desc changes password using code and user email
// @access Public
router.post('/changesPassword',passchangecontroler.changesPassword);
// @route POST api/users/changespasswitholdpass
// @desc changes password using email and old password
// @access private
router.post('/changespasswitholdpass',authUser,passchangecontroler.changesPasswordWithOldPassword)
// @route POST api/users/updateprofile
// @desc changes password using id
// @access private
router.post('/updateprofile',authUser,profile.updateProfile)
// @route POST api/users/updateprofileimage
// @desc changes profileimg using id
// @access private
router.post('/updateprofileimage',authUser,profile.updateProfileImage)
// @route POST api/users/users
// @desc get all users
// @access private only admin
router.post('/users' , authUser,userController.users)
// @route POST api/users/user/id
// @desc get a user
// @access private only admin
router.get('/user/:id' , authUser,userController.userbyid)
// @route POST api/users/change-role
// @desc change user role
// @access private only admin
router.post('/change-role' , authUser,userController.changeRole)
module.exports = router;