const mongoose = require("mongoose");
const { types } = require("util");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  address: [{
    fname: { type: String },
    lname: { type: String },
    phone: { type: String, minlength: 10, maxlength: 10 },
    country : String,
    street: String,
    area : String,
    city: String,
    state: String,
    pincode: Number
  }],
  
  cart :[{
    _id: Schema.Types.ObjectId,
    name : String , 
    description : [{line:String , _id: String}], 
    fees:Number , 
    discount : String,
    serviceImageUrl : String ,
    qty : Number
  }],
});

module.exports = mongoose.model("User", userSchema);
