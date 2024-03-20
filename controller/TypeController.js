const typeModel = require('../model/TypeModel')
const cloudinary = require('./../util/imageUpload')

const createdata = async (req,res)=>{
    // console.log("file is",req.file);
    try {

        const imageUrl = await cloudinary.uploadFile(req.file.path);
        console.log(imageUrl.secure_url);

        let types = {
            name : req.body.name,
            subcategory : req.body.subcategory,
            typeImageUrl : imageUrl.secure_url
        }
        const createdata = await typeModel.create(types)
        res.status(201).json({
            message : "Type data Create successful",
            data : createdata,
            flag : 1
        })
    } catch (error) {
        res.status(500).json({
            message : "Error to cerate type data",
            data : error ,
            flag : -1
        })
    }
}

const getdata = async (req,res)=>{
    try {
        const getdata = await typeModel.find().populate({
            path : 'subcategory',
            populate : {
                path : 'category'
            }
        })
        res.status(200).json({
            message : "Type Data get successfyl",
            data : getdata,
            flag : 1
        })
    } catch (error) {
        res.status(500).json({
            message : "Error to get type data",
            data : error ,
            flag : -1
        })
    }
}
const getdataBySubcategory = async (req,res)=>{
    try {
        const getdata = await typeModel.find({subcategory : req.body.subcategory}).populate({
            path : 'subcategory',
            populate : {
                path : 'category'
            }
        })
        // console.log(getdata);
        res.status(200).json({
            message : "Type Data get successfyl",
            data : getdata,
            flag : 1
        })
    } catch (error) {
        res.status(500).json({
            message : "Error to get type data",
            data : error ,
            flag : -1
        })
    }
}

const deletedata = async (req,res)=>{
    try {
        const deletedata = await typeModel.findByIdAndDelete(req.params.id)
        if (deletedata != null) {
            res.status(200).json({
                message : "Delete type data SuccessFul",
                data : deletedata,
                flag : 1
            })
        } else {
            res.status(404).json({
                message : "Error to not found type data",
                data : error ,
                flag : -1
            })            
        }
    } catch (error) {
        res.status(500).json({
            message : "Error to delete type data",
            data :error,
            flag :-1
        })
    }
}

const updatedata = async (req,res)=>{
    try {
        const updatedata = await typeModel.findByIdAndUpdate(req.params.id,req.body)
        if (updatedata != null) {
            res.status(200).json({
                message : "type data update SuccessFul",
                flag : 1
            })
        } else {
            res.status(404).json({
                message : "Error to find type data",
                data : error ,
                flag : -1
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "Error to update type data",
            data : error ,
            flag : -1
        })
    }
}
module.exports = {
    createdata,
    getdata,
    getdataBySubcategory,
    deletedata,
    updatedata
}