const express = require("express")
const Ride = require("../models/Ride")
const Driver = require("../models/Driver")
const User = require("../models/User")
const Booking = require("../models/Booking")
exports.createRide = async (req, res) => {
try{
    // const driverId = req.driver.id
    const{driverId, fromCity, toCity, departureTime, fare, availableSeats} = req.body

    if(!driverId || !fromCity || ! toCity || !departureTime || !fare || !availableSeats){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }
    const driver = await Driver.findById(driverId)
    if(!driver){
        return res.status(401).json({
            success:false,
            message:"driver not found, please register to continue.."
        })
    }
    if( driver.isAprroved !== true){
        return res.status(401).json({
            success:false,
            message:"Driver is not yet approved to create Ride , try after getting Approved..."
        })
    }

    //create ride
    const ride = await Ride.create({
        driver:driver._id,
        fromCity,
        toCity,
        departureTime,
        fare,
        availableSeats,
    })
    return res.status(200).json({
        success:true,
        message:"ride created successfully"
    })

}
catch(error){
   console.log(error)
   return res.status(500).json({
    success:false,
    message:"error while creating ride"
   })
}
}

//search for rides by user
exports.searchRide = async(req, res) => {
try{
    const {toCity, fromCity, date} = req.body
    
    if(!toCity || !fromCity || !date) {
        return res.status(401).json({
            success:false,
            message:"fill all the fields"
        })
    }

    //search for the specified ride 
    const rides = await Ride.find({
        toCity,
        fromCity,
        departureTime:{$gte: new Date(date).setHours(0,0,0),
                       $lt:new Date(date).setHours(23,59,59)
        }
    }).populate('driver').sort({'driver.ratings':-1})
    

    if(!rides){
        return res.status(400).json({
            success:false,
            message:"ride not found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"ride found successfully",
        rides
    })
}
catch(error){
    return res.status(500).json({
        success:false,
        message:"error in searching rides"
    })
}
}

//ride booking controller
exports.bookRide = async (req, res) => {
    const{rideId,seatsToBooked} = req.body
    const userId = req.user.id
    try{
        const ride = await Ride.findById(rideId)
        if(!ride){
            return res.status(404).json({ message: 'Ride not found' });
        }

        if(ride.availableSeats < seatsToBooked){
            return res.status(400).json({ message: `only ${ride.availableSeats} are available` });
        }
        
        ride.bookedSeats.push(userId)
        ride.availableSeats -= 1
        await ride.save()
        
        const user = await User.findById(userId)
        user.trips.push(ride._id)
        await user.save()
        
        const booking = await Booking.create({
            user:userId,
            trip:ride._id,
            bookedSeats:seatsToBooked
        })
        // Emit an event to update all clients about the seat availability
        io.emit('rideUpdated', {
            rideId: ride._id,
            seatsAvailable: ride.seatsAvailable
        });
       return res.status(200).json({ 
        message: 'Seat booked successfully', 
        ride 
       });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"error while booking rides",
            error
        })
    }
}