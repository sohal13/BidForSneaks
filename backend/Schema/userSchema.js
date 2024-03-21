import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    useremail:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
        minlength:6
    },
    userphoto:{
        type:String,
        default:"",
    },
    usernumber:{
        type:String,
        required:true,
        unique:true
    },
    userotpID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Otp'
    }
    
},{timestamps:true})

const User = mongoose.model("User",userSchema);

export default User;