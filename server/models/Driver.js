
const mongoose = require("mongoose")
const driverSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,                                                
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    licenseNumber:{
        type:String,
        required:true,
        
    },
    carRegistrationNumber:{
        type:String,
        unique:true,
        required:true
    },
    isAprroved:{
        type:Boolean,
        default:false,
    },
    token:{
        type:String
    },

    car:{
        carImage:{
            type:String,
        },
        carModel:{
            type:String
        } 
    },
    role:{
        type:String,
        enum:['User', 'Driver'],
        default:'Driver',
    },
    trips:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Trip',
    }],
    ratings:{
        type:Number,
        default:0,
    },
    totalRatings:{
        type:Number,
        default:0,
    },
    secret:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

module.exports = mongoose.model('Driver', driverSchema)