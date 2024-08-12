const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
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
    token:{
        type:String
    },
    car:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Car',
    },
    role:{
        type:String,
        enum:['User'],
        default:'User',
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

module.exports = mongoose.model('User', userSchema)