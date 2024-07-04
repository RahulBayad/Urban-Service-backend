const multer = require('multer');

const storage = multer.diskStorage({
    destination: '/upload',
    filename : function(req,file,cb){
        cb(null , file.originalname)
    }
})

const upload = multer({
    storage: storage
}).single('image');

const uploadImage = async (req,res)=>{
    console.log(req.body)
    console.log(req.file)
}

module.exports = {
    upload,
    uploadImage
}