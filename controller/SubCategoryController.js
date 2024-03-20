const subcategorymodel = require("../model/SubCategoryModel");

const createdata = async (req, res) => {
  try {
    const createproduct = await subcategorymodel.create(req.body);
    res.status(201).json({
      message: "Create product data successful",
      flag: 1,
      data: createproduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "error to create product data",
      flag: 1,
      data: error,
    });
  }
};

const getdata = async (req, res) => {
  try {
    const getdata = await subcategorymodel.find().populate('category')
    console.log(getdata);
    res.status(200).json({
      message : "Data Get Successful",
      data : getdata,
      flag : 1
    })
  } catch (error) {
    res.status(500).json({
      message : "Error to get data",
      data : error ,
      flag : -1
    })
  }
}
const getdataById = async (req, res) => {
  try {
    const getdata = await subcategorymodel.find(req.params.id).populate('Category')
    // console.log("heloo");
    console.log("request id",req.params.id);
    // let getdata = await subcategorymodel.find();
    let getdata1 = getdata.filter((fnd)=>{
      console.log("fnd.category",fnd.category);
      if(fnd.category == req.params.id){
        return fnd;
      }
    })
    // console.log("sub",getdata)
    console.log(getdata1)
    // const getcategory = await subcategorymodel.find({category : req.params.id});
    res.status(200).json({
      message : "Data by id Get Successful",
      data : getdata1,
      flag : 1
    })
  
  }catch (error) {
      res.status(500).json({
        message : "Error to get data",
        data : error ,
        flag : -1
      })
  }
}

const deletedata = async (req, res) => {
  try {
    const deletedata = await subcategorymodel.findByIdAndDelete(req.params.id);
    if (deletedata != null) {
      res.status(200).json({
        message: "Data Delete Successful",
        falg: 1,
      });
    } else {
      res.status(404).json({
        message: "Error to not found data",
        data: error,
        flag: -1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error to Delete SubCategory Data",
      data: error,
      flag: -1,
    });
  }
};

const updatedata = async (req, res) => {
  try {
    const updatedata = await subcategorymodel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (updatedata != null) {
      res.status(200).json({
        message: "data update Successful",
        flag: 1,
      });
    } else {
      res.stauts(404).json({
        message: "Error to data not found",
        flag: -1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error to update data",
      data: error,
      flag: -1,
    });
  }
};
module.exports = {
  createdata,
  getdata,
  deletedata,
  updatedata,
  getdataById
}
