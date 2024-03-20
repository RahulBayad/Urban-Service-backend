const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userHistorySchema = new Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User'},
    email : String,
    history : [{
        name : String,
        orderId : Number,
        service: [{
            name:{type:Schema.Types.ObjectId , ref:'Service'},
            qty :Number,
            cost : Number
        }],

        deliveryAddress: {
            street: String,
            city: String,
            state: String,
            pincode: Number
        },
        discount:String,
        totalAmount: Number,
        paymentMode: String,
        date: String,
        status: String
    }]

})
module.exports = mongoose.model('UserHistory',userHistorySchema)