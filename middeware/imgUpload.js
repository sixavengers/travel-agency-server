const multer = require('multer')
const path = require("path");
const UPLOADS_FOLDER = `${__dirname}/../helpers/uploads/`;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
            cb(null, UPLOADS_FOLDER)
        }
        else{
            cb(new Error('File is not supported'), false)
        }
        
    },
    filename: (req, file, cb) => {
        // console.log(file);
        const fileExt = path.extname(file.originalname);
        const fileName= file.originalname.replace(fileExt,'').toLowerCase().split(' ').join('-') + '-' + Date.now()
        cb(null, fileName + fileExt)
    }
})
// -------Prepare the final multer storage object
module.exports.imgUpload = multer({
    storage:storage,
    limits:{
        fileSize:3000000
    },
    fileFilter(req,file,cb){
        // console.log(file,"file");
        const fileTypes = /jpeg|jpg|png/;
        const extension = path.extname(file.originalname).toLowerCase();
        // console.log(extension,"extension");
        if(fileTypes.test(extension)){
            cb(null,true);
        }
            else{
                cb(new Error("Invalid File Type"))
            }
        
    }
})