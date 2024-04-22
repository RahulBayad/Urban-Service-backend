const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userHistorySchema = new Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User'},
    email : String,
    history : [{
        name : String,
        orderId : Number,
        service: [{
            service:{type:Schema.Types.ObjectId , ref:'Service'},
            type : {type : String},
            qty :Number,
            cost : Number
        }],

        deliveryAddress: {
            phone : String,
            street: String,
            area : String,
            city: String,
            state: String,
            pincode: Number,
            country : String
        },
        slotDate : String,
        slotTime : String,
        discount:Number,
        totalAmount: Number,
        paymentMode: String,
        bookingDate: String,
        status: String,
        email : String
    }]

})
module.exports = mongoose.model('UserHistory',userHistorySchema)