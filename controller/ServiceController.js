const serviceModel = require('../model/ServiceModel')
const cloudinary = require('./../util/imageUpload')

const createdata = async (req,res) =>{
    try {
        
        const imageUrl = await cloudinary.uploadFile(req.file.path);
        console.log(imageUrl.secure_url);

        var description;

        console.log(req.body.line1)
        if(req.body.line2){
            console.log("line 2");
            description = [
                {line: req.body.line1},
                {line: req.body.line2}
            ]
        }else{
            // console.log("line 2 not got");
            description = [
                {line: req.body.line1}
            ]
        }

        let serviceObj = {
            name:req.body.name,
            description:description,
            type:req.body.type,
            fees:req.body.fees,
            serviceImageUrl:imageUrl.secure_url,
        }
        console.log("data is",serviceObj);
        
        const createdata = await serviceModel.create(serviceObj)

        res.status(201).json({
            message:"data Create successful",
            data : createdata,
            flag : 1
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Error to Create data",
            data : error,
            flag : -1
        })
    }
}

const getdata = async (req, res) => {
    try {
        // const getdata = await serviceModel.find().populate('subcategory').populate('category').populate('type')
        const getdata = await serviceModel.find().populate({
            path :"type",
            populate :{
                path: 'subcategory',
                populate: {
                    path: 'category'
                }
            }
        })
        
        res.status(200).json({
            message: "Data Found",
            data: getdata,
            flag: 1
        });
    } catch (error) {
        console.log("err",error);
        res.status(500).json({
            message: "Error to found data",
            data: error,
            flag: -1
        });
    }
};

const getDataBySearch = async (req,res)=>{
    try {
        // console.log("params are",req.query)
        const services = await serviceModel.find({name : {$regex : req.query.name}}).populate("type");
        // console.log("service by search is....",services);
        res.status(200).json({
            message : "service fetched",
            data : services
        })

    } catch (error) {
        res.status(400).json({
            message : "error in get by search",
            err : error
        })
    }
}

const getdataById = async (req, res) => {
    try {
        // here id is id of type so it will services of same type id
        console.log("type is ",req.body.type);
        const getdata = await serviceModel.find({type : req.body.type}).populate({
            path :"type",
            populate :{
                path: 'subcategory',
                populate: {
                    path: 'category'
                }
            }
        })
        // console.log("services are ",getdata);
        res.status(200).json({
            message: "services Found by id",
            data: getdata,
            flag: 1
        });
    } catch (error) {
        res.status(500).json({
            message: "Error to found data",
            data: error,
            flag: -1
        });
    }
};

const deletedata = async (req, res) => {
    try {
      const deletedata = await serviceModel.findByIdAndDelete(
        req.params.id
      );
      if (deletedata != null) {
        res.status(200).json({
          message: "Category data delete SuccessFul",
          data : deletedata,
          flag: 1,
        });
      } else {
        res.status(404).json({
          message: "Not Found Category Data",
          flag: -1,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error to Delete Category data",
        data: error,
        flag: -1,
      });
    }
  };

const updatedata = async (req,res)=>{
    try {
        const updatedata = await serviceModel.findByIdAndUpdate(req.params.id,req.body)
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
    createdata,
    getdata ,
    getdataById,
    deletedata,
    updatedata,
    getDataBySearch
}