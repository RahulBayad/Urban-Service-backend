const userModel = require('../model/UserModel')
const OTP = require("../util/otp.js")
const mailer = require("../util/mail.js")


const checkEmailIsValid = async (req,res)=>{
    try {
        const email = req.params.email
        console.log("email",email)
        if(!email){ 
            return res.status(400).json({
                message : "Enter your email address",
                flag : false
            })
        }
        const user = await userModel.findOne({email})
        if(user){
            return res.status(200).json({
                message : "Email is valid",
                data : user,
                flag : true
            })
        }else{
            return res.status(400).json({
                message : "Email is not valid",
                flag : false
            })
        }
        
    } catch (error) {
        console.log("error",error)
        res.status(500).json({
            message : "Error in email checking at server side",
            data : error,
            flag : -1
        })
    }
}

const generateOTP = async (req,res) => {
    try {
        console.log("otp request came")
        const otp = await OTP.generateOTP();
        console.log("otp is ",otp)

        if(otp){
            const email = req.params.email
            console.log("otp email is",email);
            const mailOptions = {
                from : "Urban Service <no-reply@urbanService.com>",
                to : email,
                subject : "OTP verification",
                html : "Your OTP (One time password) for reset your password is <b>"+otp+"</b> valid for only 120 seconds \n."+ 
                "<br/>"+
                "<p>Note : \n This is auto-generated email. Do not reply to it."+
                "\n This website just for education purpose.</p>"
            }
            const sendEmail = await mailer.sendEmail(email, mailOptions, otp)
            console.log("mail sent")

            if(!sendEmail){
                return res.status(400).json({
                    message : "Email not sent",
                    flag : -1
                })
            }
            return res.status(200).json({
                message : "OTP generated successfully",
                data : sendEmail,
                flag : 1
            })
        }else{
            return res.status(400).json({
                message : "Error in generating OTP",
                flag : -1
            })
        }

    } catch (error) {
        console.log("error",error)
        res.status(500).json({
            message : "Error in OTP generation",
            data : error,
            flag : -1
        })
    }
}

const forgetPassword = async(req,res) =>{
    try {
        if(!req.body){
            return res.status(400).json({
                message : "Please enter all the details",
            })
        }else{
            const {email} = req.params
            const {password} = req.body
            const {cnfPassword} = req.body
            const userOtp = req.body.otp

            if(password !== cnfPassword){
                return res.status(400)/json({
                    message : "Password and repeated password should be same",
                    flag : -1
                })
            }
            const otp = await OTP.generateOTP();
            console.log("user OTP :",userOtp," and generated otp ",otp);
            if(parseInt(otp) !== parseInt(userOtp)){
                return res.status(400).json({
                    message : "OTP is not correct",
                    flag : -1
                })
            }

            const user = await userModel.findOneAndUpdate({email},{
                $set : {
                    password : password
                }
            })
            if(!user){
                return res.status(400).json({
                    message : "User not found",
                    flag : -1
                })
            }
            return res.status(200).json({
                message : "Password updated successfully",
                flag : 1
            })
        }    
        
    } catch (error) {
        console.log("error",error)
        return res.status(500).json({
            message : "Error during changing password",
            data : error,
            flag : -1
        })
    }

}

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
        console.log(error)
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
        }
        let address = {
            fname : req.body.fname,
            lname : req.body.lname,
            phone: req.body.phone,
            country:req.body.country,
            street:req.body.street,
            area:req.body.area,
            city:req.body.city,
            state:req.body.state,
            pincode:req.body.pincode
        }
        const updatedata = await userModel.updateOne({email : req.params.id},obj)
        const updateAddress = await userModel.updateOne({email : req.params.id},{$set : {[`address.${req.body.index}`] : address}})
        console.log(obj);

        if (updatedata != null) {
            res.status(200).json({
                message : "User data updated",
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
        console.log("formdata",req.body)
        let obj = {
            fname : req.body.fname,
            lname : req.body.lname,
            phone: req.body.phone,
            country:req.body.country,
            street:req.body.street,
            area:req.body.area,
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
        console.log("req.body" , req.body)
        const {type , ...cartItem} = req.body
        cartItem.serviceId = req.body._id
        cartItem.type = type._id
        cartItem.qty = 1
        console.log("req.body" , cartItem)
        const result = await userModel.updateOne({email :req.params.id }, {
            $push :{cart : cartItem }
        })
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
        // console.log("result cart 1 is",result)
        // console.log("result cart is",result[0].cart)

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
        // console.log("result is",result)
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
            // console.log("unset is",result1)
            res.status(201).json({
                message:"removed item from cart",   
                data : result1,
            })
    
        } catch (error) {
            console.log("error is",error)
            res.status(500).json({
                message:"Error to remove from cart",
                data : error
            })
        }
}
const emptyCart = async(req,res)=>{
        try {
            console.log("remove cart request is ",req.body);
            console.log("id" , req.params.id);
            
            const result = await userModel.updateOne({email :req.params.id },{
                $set: { cart: [] }
            })
            console.log("unset is",result)
            res.status(201).json({
                message:"Cart Empty",   
                data : result,
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
    checkEmailIsValid,
    generateOTP,
    forgetPassword,
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
    emptyCart,
    addAddress,
    editAddress,
    deleteAddress
}