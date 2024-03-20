const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const servProHistorySchema = new Schema({
    servPro : {type : Schema.Types.ObjectId , ref : 'ServiceProvider'},
    history : [{
        service: {type : Schema.Types.ObjectId,ref:'Service'}, 
        
        serviceAddress: {
            street: String,
            city: String,
            state: String,
            pincode: Number
        },
        paymentMode: String,
        date: String,
        status: String
    }]
})
module.exports = mongoose.model('ServProHistory',servProHistorySchema);