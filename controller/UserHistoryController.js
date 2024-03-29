const UserHistoryModel = require('./../model/UserHistoryModel');

const addOrder = async (req,res)=>{
    try{
        let services = [];
        req.body.service.map((service)=>{
            let obj = {
                service : service._id,
                qty : service.qty,
                cost : service.fees
            }  
            services.push(obj);  
        })
        console.log("service obj is ",services)
        let checkUser = await UserHistoryModel.find({email : req.body.email})
        // console.log("user is",checkUser);
        let obj = {
            history : [{
                name : req.body.address.fname +" "+ req.body.address.lname,
                orderId : req.body.orderId,
                service: services,
                deliveryAddress: {
                    street: req.body.address.street,
                    city: req.body.address.city,
                    state: req.body.address.state,
                    pincode: req.body.address.pincode
                },
                slotDate : req.body.slotDate,
                slotTime : req.body.slotTime,
                discount:req.body.discount,
                totalAmount: req.body.totalAmount,
                paymentMode: req.body.paymentType,
                bookingDate: req.body.bookingDate,
                status: req.body.status
            }]
        }
        if(checkUser.length > 0){
            let addHistory = await UserHistoryModel.updateOne({email : req.body.email},{$push : {history : obj.history[0]}})
            console.log("history is",addHistory)
            res.status(200).json({
                message:"Service Booked",
                Orders : addHistory,
                flag : true
            })
        }else{
            obj.user = req.body.user._id
            obj.email = req.body.email
            const history = await UserHistoryModel.create(obj);
            res.status(200).json({
                message:"Service Booked",
                Orders : history,
                flag : true
            })
        }
        console.log("history is" , obj);
    }catch(err){
        res.status(500).json({
            message:"Error Occured",
            Orders : err,
            flag : false
        })
    }
}

const getUserHistory = async (req,res)=>{
    try{
        const history = await UserHistoryModel.find();
        if(history){
            res.status(200).json({
                message:"Orders Fetched",
                Orders : history,
                flag : true
            })
        }else{  
            res.status(200).json({
                message:"Your History is empty , start using services now!!!!!",
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

const getUserHistoryById = async (req,res)=>{
    try{
        const orderDetail = await UserHistoryModel.find({email: req.params.id}).populate('history.service.service');
            res.status(200).json({  
                message:"Order Details Found",
                orders : orderDetail,
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

const updateOrderStatus = async (req,res)=>{
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
    getUserHistory,
    getUserHistoryById,
    updateOrderStatus
}

