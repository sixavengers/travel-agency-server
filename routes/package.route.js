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
// @access admin and manager
route.get('/getpackagebyowner',authUser,package.getpackagebyowner)
route.get('/cheackpackage/:id',authUser,package.cheackpackage)
route.patch('/activepackage/:id',authUser,package.activepackage)
// @route POST api/package/updatepackage
// @desc update package by id
// @access admin and manager
route.patch('/updatepackage/:id',authUser,package.updatepackage)
// @route POST api/package/deletepackage
// @desc deletepackage package by id
// @access admin and manager
route.delete('/deletepackage/:id',authUser,package.deletepackage)
module.exports = route;