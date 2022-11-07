const {cloudinary} = require('../config/cloudinary');
const dotenv = require('dotenv').config();
const fs = require("fs");
const uploadCloudinary = async (req, res,next) => {
    try {
        
    } catch (error) {
        res.status(500).json({ messages: error?.messages });    
    }
}
// remove temp file
const removeTmp = (path) => {
    fs.unlink(path, (err) => {
      if (err) throw err;
    });
  };