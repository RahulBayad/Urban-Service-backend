const serviceproviderModel = require('../model/ServiceProviderModel')
const userHistoryModel = require("./../model/UserHistoryModel")
const cloudinary = require('./../util/imageUpload')
// const fileUpload = require('./../util/imageUpload')

const multerMiddleware = require('./../middleware/multer');

const uploadImage = async (req,res)=>{

    
}

const addServices = async (req,res)=>{
    let serviceAlreadyAdded = false
    try {
        let obj = {
            serviceType : req.body.types
        }
        let checkService = await serviceproviderModel.findOne({email : req.params.id})
        // let checkService = await serviceproviderModel.findOne({email : req.params.id}).populate({
        //     path : "services",
        //     populate:{
        //         path:"serviceType"
        //     }
        // });
        checkService.services.map((service)=>{
            if(service.serviceType.toString() == req.body.types){
                serviceAlreadyAdded = true
                return null
            }
        })
        if(serviceAlreadyAdded){
            res.status(400).json({
                message:"Service is already added",
            })
            return null
        }
        let response = await serviceproviderModel.updateOne({email : req.params.id},{
            $push : {services : obj}
        })
        console.log("response",response);
        res.status(200).json({
            message:"Service added",
            data : response
        })
    } catch (error) {
        console.log("response",error);
        res.status(500).json({
            message:"error",
            error : error
        })
    }
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
                area:req.body.area ,
                street:req.body.street ,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode
            },
            bankAccount : {
                accountHolder : req.body.accountHolder,
                accountNumber : req.body.accountNumber,
                bank : req.body.bank,
                ifsc : req.body.ifsc
            }, 
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
        // const getdata = await serviceproviderModel.findById(req.params.id)
        const getdata = await serviceproviderModel.findOne({email:req.params.id}).populate({
            path : 'services',
            populate :{
                path : "serviceType",
                populate :{
                    path : "subcategory",
                    populate : {
                        path: "category"
                    }
                }
            }
        })
        console.log("data is",getdata);
        // console.log("types are",getdata.services);
        res.status(200).json({
            message : "Got all service provider Data SuccessFul",
            data : getdata,
            flag : 1
        })
    } catch (error) {
        console.log("error",error)
        res.status(500).json({
            message : "Error to Get Service Provider data",
            data : error ,
            flag : -1 
        })
    }
}
const getServicesById = async(req,res) =>{
    try {
        // const getdata = await serviceproviderModel.findById(req.params.id)
        const getdata = await serviceproviderModel.findOne({email:req.params.id}).populate({
            path : 'services',
            populate :{
                path : "serviceType",
                populate :{
                    path : "subcategory",
                    populate : {
                        path: "category"
                    }
                }
            }
        })
        console.log("data is",getdata);
        console.log("types are",getdata.services);
        res.status(200).json({
            message : "Got all service provider Data SuccessFul",
            data : getdata.services,
            flag : 1
        })
    } catch (error) {
        console.log("error",error)
        res.status(500).json({
            message : "Error to Get Service Provider data",
            data : error ,
            flag : -1 
        })
    }
}
const getdata = async(req,res) =>{
    try {
        const getdata = await serviceproviderModel.find().populate('services.serviceType')
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

const deleteService = async (req,res)=>{
    try {
        const index = req.body.index;
        const updatedata = await serviceproviderModel.updateOne({email : req.params.id},
            {
                $unset :{
                    [`services.${index}`] : 1
                }
            });
        const removeNull = await serviceproviderModel.updateOne({email : req.params.id},
            {
                $pull :{
                    services : null
                }
            });
        console.log("update data",updatedata);
        console.log("remove null", removeNull);
        if (updatedata != null) {
            res.status(200).json({
                message : "data udate Successful",
                data : removeNull,
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
        console.log("error",error)
        res.status(500).json({
            message : "Error to updatedata",
            data : error ,
            falg : -1
        })
    }
}

const getTypes = async(req,res)=>{
    try {

        let types = await serviceproviderModel.find({email : req.params.id})
        console.log("data is......",types)
        console.log("types are......",types.services)
        
    } catch (error) {
        res.status(500).json({
            message:"Error to get types",
            data : error ,
            flag : -1
        })
    }
}

const fetchServiceRequests = async(req,res)=>{
    try {
        
        let employee = await serviceproviderModel.findOne({email : req.params.email})
        // console.log("service array ",employee)
        let serviceArray = [];
        employee.services.map((service)=>{
            serviceArray.push(service.serviceType.toString())
        })
        console.log("service array ",serviceArray)
        
        let result = await userHistoryModel.find(
            { 
                'history.status': 'Pending', 
                'history.service.type': { $in: serviceArray } 
            }
        ).populate('history.service.service')
        let serviceRequests = [];
        let filterServiceArr = [];
        result.map((result)=>{
            result.history.map(async(request)=>{
                if(request.status == "Pending"){
                    request.service.map((serv)=>{
                        console.log("type is ",serv.type)
                        if(serviceArray.includes(serv.type)){
                            filterServiceArr.push(serv)
                        }
                    })
                    if(filterServiceArr.length != 0){
                        request.service = filterServiceArr
                        serviceRequests.push(request)
                        console.log("request",serviceRequests)
                        filterServiceArr = []
                    }
                }
            })  
        })
        res.json({
            data : serviceRequests
        })
        console.log("result is ",result)


    } catch (error) {
        console.log("error",error)
    }
}

module.exports = {
    loginValidation,
    uploadImage,
    createdata,
    addServices,
    getdata,
    getdataById,
    deletedata,
    updatedata,
    getTypes,
    deleteService,
    getServicesById,
    fetchServiceRequests    
}