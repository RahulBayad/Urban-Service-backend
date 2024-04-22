const servProHistoryModel = require('./../model/ServiceProviderHistory');
const userHistoryModel = require('./../model/UserHistoryModel');

const addOrder = async (req,res)=>{
    try{
        
        // console.log("req body",req.body)
        // console.log("req body id",req.body.service[0].service._id)
        
        let checkEmail = await servProHistoryModel.find({servPro : req.params.email})
        // console.log("check email",checkEmail)
        let obj = {
            history : [{
                service: req.body.service[0].service._id, 
                serviceAddress: {
                    name : req.body.name,
                    phone : req.body.deliveryAddress.phone,
                    street: req.body.deliveryAddress.street,
                    area : req.body.deliveryAddress.area,
                    city: req.body.deliveryAddress.city,
                    state: req.body.deliveryAddress.state,
                    pincode: req.body.deliveryAddress.pincode,
                    // country : req.body.deliveryAddress
                },
                paymentMode: req.body.paymentMode,
                date: req.body.bookingDate,
                slotDate : req.body.slotDate,
                totalAmount: req.body.service[0].cost,
                slotTime : req.body.slotTime,
                status: req.body.status,
                email : req.body.email
            }]
        }
        if(checkEmail < 1){
            obj.servPro = req.params.email
            console.log("obj",obj)
            let addOrder = await servProHistoryModel.create(obj);
            let updateStatus = await userHistoryModel.updateOne({email})
        }else{
            let addOrder = await servProHistoryModel.updateOne({servPro:req.params.email},{
                $push : {
                    history : obj.history[0]
                }
            })
        }
        console.log(req.body)
        // console.log(req.body.email)
        const updateStatus = await userHistoryModel.updateOne({email : req.body.email,'history._id' : req.body._id},
            {
                $set:{ 'history.$.status' :"Confirmed"}
            })
        console.log(updateStatus)
        res.status(200).json({
            message:"Service Accepted",
            Orders : addOrder,
            flag : true
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Error Occured",
            error : err,
            flag : false
        })
    }
}

const getServProHistory = async (req,res)=>{
    try{
        const history = await servProHistoryModel.find();
        if(history){
            res.status(200).json({
                message:"Complated Services Fetched",
                Orders : history,
                flag : true
            })
        }else{  
            res.status(200).json({
                message:"Your History is empty , start working now!!!!!",
                Orders : history,
                flag : true
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Error Occured",
            Orders : err,
            flag : false
        })
    }
}

const getServProHistoryById = async (req,res)=>{
    try{
        const history = await servProHistoryModel.findById(req.params.id);
        res.status(200).json({
            message:"Complated Services Fetched",
            Orders : history,
            flag : true
        })
    }catch(err){
        res.status(500).json({
            message:"Error Occured",
            Orders : err,
            flag : false
        })
    }
}

const updateServiceStatus = async (req,res)=>{
    try{
        const updateStatus = await UserHistoryModel.findByIdAndUpdate(req.params.id,req.body);
            res.status(200).json({
                message:"Status Updated",
                Orders : updateStatus,
                flag : true
            })
        
    }catch(err){
        res.status(500).json({
            message:"Error Occured",
            Orders : err,
            flag : false
        })
    }
}

module.exports = {
    addOrder,
    getServProHistory,
    getServProHistoryById,
    updateServiceStatus
}