const serviceproviderModel = require('../model/ServiceProviderModel')
const cloudinary = require('./../util/imageUpload')
// const fileUpload = require('./../util/imageUpload')

const multerMiddleware = require('./../middleware/multer');

const uploadImage = async (req,res)=>{

    
}

const createdata = async (req,res) =>{

    try {
        if(req.file == undefined){  
            return res.status(400).json({
                data: "Please select a picture"
            })
        }

        const checkEmail = await serviceproviderModel.find({email : req.body.email})
        if(checkEmail.length > 0){
            console.log("already registred")
            return res.status(400).json({data : "This email is already registered" })
        }
        const checkPhone = await serviceproviderModel.find({phone : req.body.phone})
        if(checkPhone.length > 0){
            return res.status(400).json({data : "This phone number is already registered" })
        }
       
        let result = await cloudinary.uploadFile(req.file.path);
        console.log(result.secure_url);
        console.log(req.body.password);
        
        let obj = {
            // role: req.body.role,
            role: "65ce45cfdb522781cc3c0c9c",
            fname: req.body.fname,
            lname: req.body.lname,
            dob: req.body.dob,
            gender : req.body.gender,
            maritalStatus : req.body.maritalStatus,
            email: req.body.email,
            phone: req.body.phone,
            password:req.body.password ,
            // password:"24562662" ,
            education:{
                qualification :req.body.qualification ,
                degree : req.body.degree
            },
            profilePictureUrl : result.secure_url ,
            address: {
                country :req.body.country ,
                street:req.body.street ,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode
            },
            bankAccount : [{
                accountHolder : req.body.accountHolder,
                accountNumber : req.body.accountNumber,
                bank : req.body.bank,
                ifsc : req.body.ifsc
            }], 
        }

        const saveserviceproviderdata = await serviceproviderModel.create(obj);
    
        res.status(201).json({
            data : "Registration successful", 
        })
    
    } catch (error) {
        res.status(500).json({
            data : error
        })
    }
}

const loginValidation = async(req,res)=>{
    console.log("password",req.body.password)
    try{
        let loginData = await serviceproviderModel.find({email : req.body.email});
        console.log(loginData);
        console.log("logindata email",loginData.email)
        console.log("logindata password",loginData.password)
        if(loginData.length == 0){
            console.log("email not found") 
            return res.status(400).json({message : "Could not find email"})
        }else if(loginData[0].password != req.body.password){
            console.log("incorrect password") 
            return res.status(400).json({message : "Incorrect password"})
        }
        res.status(200).json({
            message : "Successfully Login"
        })
        
    }catch(error){
        res.json({
            message : "Error occured",
            error : error
        })
    }

}

const getdataById = async(req,res) =>{
    try {
        const getdata = await serviceproviderModel.findById(req.params.id)
        console.log(getdata);
        res.status(200).json({
            message : "Got all service provider Data SuccessFul",
            data : getdata,
            flag : 1
        })
    } catch (error) {
        res.status(500).json({
            message : "Error to Get Service Provider data",
            data : error ,
            flag : -1 
        })
    }
}
const getdata = async(req,res) =>{
    try {
        const getdata = await serviceproviderModel.find().populate('role')
        console.log(getdata);
        res.status(200).json({
            message : "Got all service provider Data SuccessFul",
            data : getdata,
            flag : 1
        })
    } catch (error) {
        res.status(500).json({
            message : "Error to Get Service Provider data",
            data : error ,
            flag : -1 
        })
    }
}

const deletedata = async (req,res)=>{
    try {
        const deletedata = await serviceproviderModel.findByIdAndDelete(req.params.id)
        if (deletedata  != null) {
            res.status(200).json({
                message : "Role data delete SuccessFul",
                data : deletedata,
                flag : 1
            })
        } else {
            res.status(404).json({
                message : "Error to not Found Service Providr data",
                data : error,
                flag : -1
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "Error to Delete Role data",
            data : error,
            flag : -1
        })
    }
}

const updatedata = async(req,res)=>{
    if(req.file == undefined){  
        return res.status(400).json({
            data: "Please select a picture"
        })
    }

    const checkEmail = await serviceproviderModel.find({email : req.body.email})
    if(checkEmail.length > 0){
        console.log("already registred")
        return res.status(400).json({data : "This email is already registered" })
    }
    const checkPhone = await serviceproviderModel.find({phone : req.body.phone})
    if(checkPhone.length > 0){
        return res.status(400).json({data : "This phone number is already registered" })
    }
    let obj = {
        role: "65ce45cfdb522781cc3c0c9c",
        fname: req.body.fname,
        lname: req.body.lname,
        dob: req.body.dob,
        gender : req.body.gender,
        maritalStatus : req.body.maritalStatus,
        email: req.body.email,
        phone: req.body.phone,
        password:req.body.password ,
        education:{
            qualification :req.body.qualification ,
            degree : req.body.degree
        },
        profilePictureUrl : result.secure_url ,
        address: {
            country :req.body.country ,
            street:req.body.street ,
            city: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode
        },
        bankAccount : [{
            accountHolder : req.body.accountHolder,
            accountNumber : req.body.accountNumber,
            bank : req.body.bank,
            ifsc : req.body.ifsc
        }], 
    }
    try {
       const updatedata = await serviceproviderModel.findByIdAndUpdate(req.params.id,req.body) 
       if (updatedata !=  null) {
        res.status(200).json({
            message : "Profile updation SuccessFul",
            flag : 1
        })
       }else {
        res.status(404).json({
            message : "Error occured",
            data : error,
            flag : -1
        })
       }
    } catch (error) {
        res.status(500).json({
            message:"Error to update Service Provide data",
            data : error ,
            flag : -1
        })
    }
}

const updateNestedData = async (req,res)=>{
    try {
        
        const updatedata = await serviceproviderModel.findByIdAndUpdate(req.params.id,
            {
                $push :{
                    services : req.body
                }
            });
        console.log(updatedata);
        if (updatedata != null) {
            res.status(200).json({
                message : "data udate Successful",
                flag : 1
            })
        } else {
            res.status(404).json({
                message : "Error to find Servie data ",
                data : error ,
                falg : -1
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "Error to updatedata",
            data : error ,
            falg : -1
        })
    }
}
module.exports = {
    loginValidation,
    uploadImage,
    createdata,
    getdata,
    getdataById,
    deletedata,
    updatedata,
    updateNestedData
}