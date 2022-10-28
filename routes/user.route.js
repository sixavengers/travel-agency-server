const router = require("express").Router();

// // init controller
 const userController = require("../controllers/user.controller");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", userController.register);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", userController.login);

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get("/current",  userController.currentUser);

module.exports = router;