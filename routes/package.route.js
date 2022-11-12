const package = require("../controllers/package.controler");
// -----authVerify-----
const authUser = require("../middeware/authVerify")
const route = require('express').Router();


// @route POST api/package/createpackage
// @desc Create a new package
// @access admin and manager
route.post('/createpackage',authUser,package.createPackage)
// @route POST api/package/getpackagebyowner
// @desc get all packages by user id
// @access package owner
route.get('/getpackagebyowner',authUser,package.getpackagebyowner)

module.exports = route;