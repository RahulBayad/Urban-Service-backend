const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const serviceproviderSchema = new Schema({
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  fname: {type: String, required: true },
  lname: {type: String, required: true },
  dob: {type: String, required: true },
  gender : {type: String, required: true},
  maritalStatus : String,
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, minlength: 10, maxlength: 10, unique: true },
  password: { type: String, required: true, minlength: 8 },
  education:{
    qualification : {type : String,required : true},
    degree : String
  },
  profilePictureUrl : String,
  address: {
    country : { type: String, required: true},
    street: { type: String, required: true},
    area: { type: String, required: true},
    city: { type: String, required: true},
    state: { type: String, required: true},
    pincode: { type: String, required: true}
  },
  bankAccount : {
    accountHolder : {type : String,required : true},
    accountNumber : {type : String,required : true},
    bank : {type : String,required : true},
    ifsc : {type : String,required : true}
  }, 
  services : [{
    serviceType:{type : Schema.Types.ObjectId,ref:'Type'},
    email : String,
    phone : String,
    city:String,
  }],
  
})

module.exports = mongoose.model("ServiceProvider", serviceproviderSchema);
