const cloudinary = require('cloudinary').v2;
const { error } = require('console');
const multer = require('multer');
require('dotenv').config();

const uploadFile = async (filepath)=>{
        cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key : process.env.API_KEY,
            api_secret : process.env.API_SECRET,
        })  
        try {
            if(!filepath){
                // res.json({message : "Please select a file"});
                return null
            }
            else{
                const res = await cloudinary.uploader.upload(filepath);
                return res;
            }
            
        } catch (error) {
            // res.json({error  : error});
            return null;
        }

}
module.exports = {
    uploadFile
} 

