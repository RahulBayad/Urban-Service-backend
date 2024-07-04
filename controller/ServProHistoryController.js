const userHistoryModel = require('./../model/UserHistoryModel');
const servProHistoryModel = require('./../model/ServiceProviderHistory');

const addOrder = async (req,res)=>{
    try{
        let checkEmail = await servProHistoryModel.find({servPro : req.params.email})

        let serviceArr = req.body.service.map((services)=>(
            {
                service : services.service._id,
                type: services.type,
                qty : services.qty,
                cost : services.cost,
            }
        ))
        let totalAmount = 0
        for(let a of req.body.service){
            totalAmount = totalAmount + (a.cost * a.qty)
        }
        
        let obj = {
            history : [{
                // service: req.body.service[0].service._id, 
                services : serviceArr,
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
                bookingDate: req.body.bookingDate,
                slotDate : req.body.slotDate,
                totalAmount: totalAmount,
                slotTime : req.body.slotTime,
                status: req.body.status,
                email : req.body.email
            }]
        }
        if(checkEmail < 1){
            obj.servPro = req.params.email
            console.log("obj",obj)
            var bookOrder = await servProHistoryModel.create(obj);
        }else{
            var bookOrder = await servProHistoryModel.updateOne({servPro:req.params.email},{
                $push : {
                    history : obj.history[0]
                }
            })
        }
        console.log(req.body)

        const updateStatus = await userHistoryModel.updateOne({email : req.body.email,'history._id' : req.body._id},
            {
                $set:{ 'history.$.status' :"Confirmed"}
            })
        console.log(updateStatus)
        res.status(200).json({
            message:"Service Booked",
            Orders : bookOrder,
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
        console.log(req.params.email)
        const history = await servProHistoryModel.find({servPro : req.params.email}).populate('history.services.service');
        console.log(history)
        res.status(200).json({
            message:"Complated Services Fetched",
            Orders : history,
            flag : true
        })
    }catch(err){
        console.log(err)
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

const cancelOrder = async (req,res) =>{
    try{
        console.log("order ",req.body)

        let cancellation = await servProHistoryModel.updateOne({servPro : req.params.email ,'history._id':req.body._id},{
            $set : {
                'history.$.status' : "Cancelled"
            }
        })

        console.log("Order cancelled successfully",cancellation)
        res.status(200).json({
            message : "Order Cancelled",
            data : cancellation
        })
        
    }catch(err){
        res.status(400).json({
            message : "Error in cancellation",
            data : err
        })
    }
}

const completeOrder = async (req,res) =>{
    try{
        console.log("order 1",req.body)   

        let CompleteOrder = await servProHistoryModel.updateOne({servPro : req.params.email ,'history._id':req.body._id},{
            $set : {
                'history.$.status' : "Completed"
            }
        })

        console.log("Order Completed",CompleteOrder)
        res.status(200).json({
            message : "Order Completed",
            data : CompleteOrder
        })
        
    }catch(err){
        res.status(400).json({
            message : "Error in cancellation",
            data : err
        })
    }
}
   
module.exports = {
    addOrder,
    getServProHistory,
    getServProHistoryById,
    updateServiceStatus,
    cancelOrder,
    completeOrder
}