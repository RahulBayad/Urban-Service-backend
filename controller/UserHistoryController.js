const UserHistoryModel = require('./../model/UserHistoryModel');

const addOrder = async (req,res)=>{
    try{
        const history = await UserHistoryModel.create(req.body);
            res.status(200).json({
                message:"Order Confirmed",
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
        const orderDetail = await UserHistoryModel.findById(req.params.id);
            res.status(200).json({
                message:"Order Details Found",
                Orders : orderDetail,
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

