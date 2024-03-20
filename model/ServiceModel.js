const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: {type: String, required: true,},
  description : [{
    line : String
  }],
  type: { type: Schema.Types.ObjectId,ref: "Type",},
  fees: {type: Number,required: true,},
  serviceImageUrl:String,
  area: {type: String,max: 50,},
  city: {type: String,max: 20,},
  state: { type: String, max: 20 },
});
module.exports = mongoose.model("Service", serviceSchema);


