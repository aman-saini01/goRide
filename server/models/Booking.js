const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    trip:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Ride',
        required:true,
    },
    bookedSeats:{
        type:Number,
        required:true,
    },
    bookingDate:{
        type:Date,
        default:Date.now,

    },
    status:{
        type:String,
        enum:['Confirmed', 'Cancelled', 'Pending'],
        default:'Confirmed',
    }
})

module.exports = mongoose.model("Booking", bookingSchema)