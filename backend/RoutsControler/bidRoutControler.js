import Bid from "../Schema/bidSchema.js";
import Shoe from "../Schema/shoesSchema.js";

export const placeBid = async (req, res) => {
    try {
        const shoeID = req.params.id;
        const {bidamount} = req.body;
        const bidder = req.user._id;
        const shoe = await Shoe.findById(shoeID);
        if(!shoe) return res.status(404).send({message:"Shoes Not Found 404",success:false});
        if(shoe.price > bidamount){
            return res.status(500).send({message:"Bid Amount Sould be grater Then Price",success:false});
        }
        if(shoe.topBid > bidamount){
            return res.status(500).send({message:"Bid Amount Sould be grater Then TopBid",success:false});
        }
        const newBid =new Bid({
            shoeID,
            bidamount,
            bidder,
        })

        if(newBid){
            await  newBid.save();
            if (bidamount > shoe.topBid) {
                shoe.topBid = bidamount;
            }
            shoe.allBids.push(newBid._id);
            await shoe.save();
        }

        res.status(201).send({
            success:false,
            newBid,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Internal Server Error ${error}`, success: false })
    }
}

export const getAllBidsForShoe=async(req,res)=>{
    try {
        const shoeID = req.params.id;
        if(!shoeID) return res.status(404).send({message:"Shoe Not Found",success:false});
        const allBids = await Bid.find({shoeID});
        if(!allBids) return res.status(404).send({message:"No Bid Found For This Shoes",success:false});
        res.status(200).send({
            success:true,
            allBids
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Internal Server Error ${error}`, success: false })
    }
}
export const getHighestBidForShoe=async(req,res)=>{
    try {
        const shoeID = req.params.id;
        if(!shoeID) return res.status(404).send({message:"Shoe Not Found",success:false});
        const highestBid = await Bid.find({shoeID}).sort({ bidamount: -1 }).limit(1);
        if(!highestBid) return res.status(404).send({message:"No Bid Found For This Shoes",success:false});

        res.status(200).send({
            success:true,
            highestBid
        })

        } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Internal Server Error ${error}`, success: false })
    }
}


export const getMyBids=async(req,res)=>{
    try {
         const userID = req.user._id;
         console.log(userID);
         if(!userID) return res.status(404).send({message:"Login First",success:false});
         const bidder = await Bid.find({bidder:userID});
        if(!bidder) return res.status(404).send({message:"No Bid Placed with This Account",success:false});

        res.status(200).send({
            success:true,
            bidder
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Internal Server Error ${error}`, success: false })
    }
}
