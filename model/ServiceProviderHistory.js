const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const servProHistorySchema = new Schema({
    servPro : String,
    history : [{
        service: {type : Schema.Types.ObjectId,ref:'Service'}, 
        
        serviceAddress: {
            name : String,
            phone : String,
            street: String,
            area : String,
            city: String,
            state: String,
            pincode: Number,
            country : String
        },
        paymentMode: String,
        date: String,
        slotDate : String,
        totalAmount: Number,
        slotTime : String,
        status: String
    }]
})
module.exports = mongoose.model('ServProHistory',servProHistorySchema);