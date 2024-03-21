import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    usernumber:{
        type:String,
        required:true,
        unique:true,
    },
    otp:{
        type:String,
        required:true,
    },
    otpExpiration:{
        type:Date,
        default:Date.now,
        get: (otpExpiration)=> otpExpiration.getTime(),
        set: (otpExpiration)=> new Date(otpExpiration)
    }, 
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },

},{timestamps:true})

const OTP = mongoose.model("Otp",otpSchema);

export default OTP;