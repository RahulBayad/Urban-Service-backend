const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  link:String,
  subcategory : {type:Schema.Types.ObjectId,ref:'SubCategory'},
  typeImageUrl : String
});

module.exports = mongoose.model('Type',typeSchema)