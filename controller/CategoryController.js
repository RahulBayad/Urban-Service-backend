const categoryModel = require("../model/CategoryModel");

const createcategorydata = async (req, res) => {
  try {
    const savedata = await categoryModel.create(req.body);
    res.status(201).json({
      message: "Category Data Create Successfully",
      data: savedata,
      flag: 1,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error to Create to category data",
      data: error,
      flag: -1,
    });
  }
};
 
const getcategorydata = async (req, res) => {
  try {
    const getcategorydata = await categoryModel.find();
    if (getcategorydata != null) {
      res.status(200).json({
        message: "Get all Category data SuceessFul",
        data: getcategorydata,
        flag: 1,
      });
    } else {
      res.stauts(404).json({
        message : "No data Found",
        flag : 1
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "Error To get Category data",
      data: err,
      flag: -1,
    });
  }
};

const deletecategorydata = async (req, res) => {
  try {
    const deletecategorydata = await categoryModel.findByIdAndDelete(
      req.params.id
    );
    if (deletecategorydata != null) {
      res.status(200).json({
        message: "Category data delete SuccessFul",
        data : deletecategorydata,
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

const updatecategorydata = async (req, res) => {
  const id = req.params.id;
  const newcategory = req.body;
  try {
    const updatecategorydata = await categoryModel.findByIdAndUpdate(
      id,newcategory
    );
    if (updatecategorydata == null) {
      res.status(404).json({
        message: "category not found not found",
        flag: -1,
      });
    } else {
      res.status(200).json({
        message: "data update successful",
        flag: 1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error to Update Category Data",
      data: error,
      flag: -1,
    });
  }
};

module.exports = {
  createcategorydata,
  getcategorydata,   
  deletecategorydata,
  updatecategorydata,
};
