const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    required: true,
  },
  toCity:{
    type:String,
    required:true
  },
  fromCity:{
    type:String,
    required:true
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
  },
  car: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    // required: true,
 }, 
  availableSeats: {
    type: Number,
    required: true,
  },
  fare:{
    type:Number,
    required:true
  },
  bookedSeats: [{
    type: mongoose.Schema.Types.ObjectId,
    default: 0,
    ref:'User'
  }],
  status: {
    type: String,
    enum: ["Scheduled", "Ongoing", "Completed", "Cancelled"],
    default: "Scheduled",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ride", rideSchema);
