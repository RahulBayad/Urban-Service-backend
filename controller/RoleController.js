const roleModel = require("../model/RoleModel");

const createroledata = async (req, res) => {
  try {
    const saveroledata = await roleModel.create(req.body);
    res.status(201).json({
      message: "Role data Create  Successfuly",
      data: saveroledata,
      flag: 1,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error to create Role data",
      data: error,
      flag: -1,
    });
  }
};

const getroledata = async (req, res) => {
  try {
    const getroledata = await roleModel.find();
    res.status(200).json({
      message: "Role data Get successFul",
      data: getroledata,
      flag: 1,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error To Get role data",
      data: error,
      flag: -1,
    });
  }
};

const deleteroledata = async (req, res) => {
  try {
    const deleteroledata = await roleModel.findByIdAndDelete(req.params.id);
    if (deleteroledata != null) {
      res.status(200).json({
        message: "Role Data delete SuccessFul",
        data: deleteroledata,
        flag: 1,
      });
    } else {
      res.status(404).json({
        message: "Error Role Data not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error to Delete Role data ",
      data: error,
      flag: -1,
    });
  }
};

const updateroledata = async (req,res) =>{
    try {
        const updateroledata = await roleModel.findByIdAndUpdate(req.params.id,req.body)
        if (updateroledata != null) {
            res.status(200).json({
                message : "Update Roledata SuccessFul",
                flag : 1
            })
        } else {
            res.status(404).json({
                message :"Error to not found role data",
                data : error ,
                flag : -1
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message : "Error in update Role data",
            data : error,
            flag : -1
        })
    }
}
module.exports = {
  createroledata,
  getroledata,
  deleteroledata,
  updateroledata
};
