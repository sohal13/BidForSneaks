import mongoose from "mongoose";

const bidSchema = mongoose.Schema({
    shoeID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shoe',
        required:true,
    },
    bidamount:{
        type:Number,
        required:true,
    },
    bidder:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true});

const Bid = mongoose.model('Bid',bidSchema);

export default Bid;