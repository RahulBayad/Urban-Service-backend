const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    
    // destination: path.join(__dirname+ '/uploads'),
    filename : function(req,file,cb){
        cb(null , file.originalname )
    }
})

const  upload =  multer({
    storage: storage
}).single('profilePictureUrl');

module.exports = {upload};