const servProHistoryModel = require('./../model/ServiceProviderHistory');

const addService = async (req,res)=>{
    try{
        const history = await servProHistoryModel.create(req.body);
            res.status(200).json({
                message:"Service Accepted",
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
    addService,
    getServProHistory,
    getServProHistoryById,
    updateServiceStatus
}