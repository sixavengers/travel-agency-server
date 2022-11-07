const {cloudinary} = require('../config/cloudinary');
const dotenv = require('dotenv').config();
const fs = require("fs");
const User = require('../Models/User');
exports.uploadCloudinary = async (req, res,next) => {
    try {
        const id = req.userData.id
        const file = req.file.path
        const user = await User.findById(id);
        await removeOldImage(id);
        // -------file name what file you want to upload
          const url = await cloudinary.v2.uploader.upload(file, {
            folder: `${user.email}/profile`,
            use_filename: true,
          })
          // --------add url to req
          user.cloudinary_id = url.public_id;
         await user.save()
         req.url = url
         removeTmp(file)
         // -------send the result to the client
        next();
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
  // -----------------remove old image from cloudinary-----------------
  const removeOldImage = async (id) => {
      const user = await User.findById(id);
      if (user?.cloudinary_id) {
        await cloudinary.v2.uploader.destroy(user?.cloudinary_id);
      }
      return    
  }