const mongoose = require('mongoose');
const {mailSender} = require("../utils/mailSender")
const otpSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: false,
  //   // // Ensure each user has only one OTP record
  //   // unique: true, 
  // },
  email:{
    type:String,
    required:true,
    
  },
  otp: {
    type: String,
    required: true,
  },
  otpExpires: {
    type: Date,
    required: true,
  },
  secret:{
    type:String,
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires:60 * 5,
  },
});

const sendVerificatioEmail = async (email, otp)=>{
  try{
      const mailResponse = await mailSender(
        email,
        "Verification Email",
        otp
      )
      console.log("mail sent successfully", mailResponse.response)
  }
  catch(error){
    console.log("error in sending verification mail", error)
    throw error
  }
}

otpSchema.post("save", async function(next){
  try{
    if(this.isNew){
      await sendVerificatioEmail(this.email,this.otp)
    }
  }
  catch(error){}
})

module.exports = mongoose.model('Otp', otpSchema);
