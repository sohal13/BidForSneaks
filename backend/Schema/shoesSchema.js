import mongoose from "mongoose";

const shoeSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    brand: {
        type: String,
        require: true,
        set: (value) => value.toUpperCase()
    },
    description: { 
        type: String ,
        required:true
     }, 
    imageUrls:[
      { 
        type: String, 
        required:true
     },
    ], 
    size: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    topBid: {
        type: Number,
    },
    allBids:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bid'
}],
    auctionEndDate: { 
        type: Date, 
        required: true 
    },
    seller: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
},{timestamps:true})

const Shoe = mongoose.model('Shoe', shoeSchema);

export default Shoe;
