const userModel = require('../model/UserModel')

const createdata = async (req,res)=>{
    try {
        // console.log(req.body);
        let checkEmail = await userModel.find({email : req.body.email});
        console.log(checkEmail);
        if(checkEmail.length > 0){
            return res.status(400).json({message : "This email is already registered"})
        }
        const createdata = await userModel.create(req.body)
        res.status(201).json({
            message : "Successfully registered !!",
        })
    } catch (error) {
        console.log("error",error)
        res.status(500).json({
            message : "Error in registration",
            data : error,
            flag : -1
        })
    }
}

const loginValidation = async(req,res)=>{
    console.log("password is",req.body.password)
    try{
        let loginData = await userModel.find({email : req.body.email});
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

const getdata = async (req,res)=>{
    try {
        const getdata = await userModel.find().populate('role')
        res.status(200).json({
            message : "User data get successful",
            data : getdata,
            flag : 1
        })
    } catch (error) {
        res.status(500).json({
            message : "Error to get all user data",
            data : error ,
            falg : -1
        })
    }
}
const getdataByEmail = async (req,res)=>{
    try {
        console.log("email is",req.body)
        const getdata = await userModel.findOne({email : req.body.email}).populate('role')
        res.status(200).json({
            message : "User data get successful",
            data : getdata,
            flag : 1
        })
    } catch (error) {
        res.status(500).json({
            message : "Error to get all user data",
            data : error ,
            falg : -1
        })
    }
}

const deletedata = async (req, res) => {
    try {
      const deletedata = await userModel.findByIdAndDelete(
        req.params.id
      );
    //   console.log("datele data",deletedata)
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

const updatedata = async (req,res) =>{
    try {
        let obj = {
            email: req.body.email,
            password: req.body.password,
            address:{
                fname : req.body.fname,
                lname : req.body.lname,
                phone: req.body.phone,
                country:req.body.country,
                street:req.body.street,
                city:req.body.city,
                state:req.body.state,
                pincode:req.body.pincode
            }
        }
        console.log(obj);

        const updatedata = await userModel.updateOne({email : req.params.id},obj)
        if (updatedata != null) {
            res.status(200).json({
                message : "User data update successful",
                data : updatedata
            })
        } else {
            res.status(404).json({
                message : "Error to found user data",
                data : updatedata ,
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "Error to update user data",
            data : error ,
            flag : -1
        })
    }
}

const addAddress = async (req,res) =>{
    try {
        let obj = {
            fname : req.body.fname,
            lname : req.body.lname,
            phone: req.body.phone,
            country:req.body.country,
            street:req.body.street,
            city:req.body.city,
            state:req.body.state,
            pincode:req.body.pincode
        }
            const updatedData = await userModel.updateOne(
                { email: req.params.id },
                { $push: { address: obj } }
            );
            res.status(200).json({
                message : "User address added successful",
                data : updatedata
            })
       
    } catch (error) {
        res.status(500).json({
            message : "Error to update user data",
            data : error ,
            flag : -1
        })
    }
}

const editAddress = async (req,res)=>{
    console.log(req.body.data);
    console.log(req.body.index);
    try {
        const updatedata = await userModel.updateOne({email : req.params.id},{
            $set : { [`address.${req.body.index}`]: req.body.data } 
        })
        console.log("response is",updatedata)
        res.status(200).json({
            message : "User address updated",
            data : updatedata
        })
      
    } catch (error) {
        res.status(500).json({
            message : "Error to update user data",
            data : error ,
            flag : -1
        })
    }
}

const deleteAddress = async (req,res)=>{
    try {
        let deleteAddress = await userModel.updateOne({email:req.params.id},{
            $unset : {[`address.${req.body.index}`] : 1}
        })
        let removeNullAddress = await userModel.updateOne({email:req.params.id},{
            $pull : { address : null }
        })
        
        res.status(201).json({
            message : "Address Removed",
            data : removeNullAddress
        })
    } catch (error) {
        res.status(400).json({
            message:"Error occured",
            error : error
        })
    }
}

const addToCart = async(req,res)=>{
    try {
        req.body.qty = 1
        const result = await userModel.updateOne({email :req.params.id }, {$push :{cart : req.body }})
        console.log("result is",result)
        res.status(201).json({
            message:"service added to cart",
            data : result
        })

    } catch (error) {
        console.log("error is",error)
        res.status(500).json({
            message:"Error to add service in cart",
            data : error
        })
    }
}

const getCart = async(req,res)=>{
    try {
        // req.body.qty = 1
        const result = await userModel.find({email : req.params.id})
        console.log("result cart is",result[0].cart)

        res.status(200).json({
            message:"cart fetched",
            data : result[0].cart 
        })

    } catch (error) {
        console.log("error is",error)
        res.status(500).json({
            message:"Error to fetch cart",
            data : error
        })
    }
}

const updateQty = async(req,res)=>{
    try {
        console.log("body is ",req.body);
        const result = await userModel.updateOne({email :req.params.id }, { $set: { [`cart.${req.body.index}`]: req.body.service } })
        console.log("result is",result)
        res.status(201).json({
            message:"service added to cart",
            data : result
        })

    } catch (error) {
        console.log("error is",error)
        res.status(500).json({
            message:"Error to add service in cart",
            data : error
        })
    }
}

const removeFromCart = async(req,res)=>{
        try {
            console.log("remove cart request is ",req.body);
            const result1 = await userModel.updateOne({email :req.params.id },{
                $unset: { [`cart.${req.body.index}`]: 1 }
              })
            const result2 = await userModel.updateOne({email :req.params.id },{
                $pull: { cart: null }
              })
            console.log("unset is",result1)
            // console.log("pull is",result2)
            res.status(201).json({
                message:"removed item from cart",   
                data : result1,
                // data2 : result2,
            })
    
        } catch (error) {
            console.log("error is",error)
            res.status(500).json({
                message:"Error to remove from cart",
                data : error
            })
        }
}


module.exports = {
    loginValidation,
    createdata,
    getdata,
    deletedata,
    updatedata,
    getdataByEmail,
    addToCart,
    updateQty,
    getCart,
    removeFromCart,
    addAddress,
    editAddress,
    deleteAddress
}