import Shoe from "../Schema/shoesSchema.js";


export const listShoe=async(req,res)=>{
    try {
        const {name,brand,size,color,price,imageUrls,description ,auctionEndDate} = req.body;
        const seller = req.user._id;
        if(!seller)  return res.status(404).send({message:"Login First to List Product",success:false});
        if(!name || !imageUrls || !description || !brand || !size || !color || !price || !auctionEndDate){
            return res.status(404).send({message:"Fill All the Boxes",success:false});
        }
        if (!imageUrls || imageUrls.length === 0 || imageUrls.length > 6) {
            return res.status(400).send({ message: "Provide between 1 and 6 image", success: false });
        }
        const listedShoe = new Shoe({
            name,
            brand,
            size,
            imageUrls,
            description,
            color,
            price,
            auctionEndDate,
            seller,
        })
        if(listedShoe){
            await listedShoe.save();
        }

        res.status(201).send({
            message:"Shoe Listed Succesfully!!",
            success:true,
            listedShoe,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({message:`Internal Server Error ${error}`,success:false})
    }
}

export const updateShoe =async(req,res)=>{
    try {
        const shoeID = req.params.id
        const currentUser = req.user._id
        const shoe = await Shoe.findById(shoeID);
        if(!shoe){
            return res.status(404).send({message:"Shoe Not Found",message:false})
        }
        if(shoe.seller.toString() !== currentUser.toString()) return  res.status(404).send({message:"Only This Shoe Seller Can Update",message:false})

        const updateShoe = await Shoe.findByIdAndUpdate(shoeID,req.body,{new:true});

        res.status(200).send({
            message:"Selected Shoe Updated SuccesFully!!",
            success:true,
            updateShoe
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({message:`Internal Server Error ${error}`,success:false})    
    }
}

export const deleteShoe=async(req,res)=>{
    try {
        const shoeID = req.params.id
        const currentUser = req.user._id
        const shoe = await Shoe.findById(shoeID);
        if(!shoe){
            return res.status(404).send({message:"Shoe Not Found",message:false})
        }
        if(shoe.seller.toString() !== currentUser.toString()) return  res.status(404).send({message:"Only This Shoe Seller Can Delete",message:false})
        
        const deleteShoe = await Shoe.findByIdAndDelete(shoeID,{new:true});

        res.status(200).send({message:"Shoe Deleted SuccesFully!!",success:true,deleteShoe})
    } catch (error) {
        console.log(error);
        res.status(500).send({message:`Internal Server Error ${error}`,success:false})    
    }
}


export const shoes=async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = 8; 
        const totalCount = await Shoe.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);

        const shoes = await Shoe.find().skip((page-1)*limit).limit(limit);
        if(!shoes || shoes.length === 0) return res.status(404).send({message:"No Shoes Listed",success:false});

        res.status(200).json({
            shoes,
            currentPage: page,
            totalPages,
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({message:`Internal Server Error ${error}`,success:false})    
    }
}


export const singleShoe=async(req,res)=>{
try {
    const shoeID = req.params.id;
    const shoe = await Shoe.findById(shoeID);
    if(!shoe){
        return res.status(404).send({message:"Shoe Not Found",message:false})
    }
    res.status(200).send({shoe , success:true})
} catch (error) {
    console.log(error);
    res.status(500).send({message:`Internal Server Error ${error}`,success:false}) 
}
}

export const sellerShose=async(req,res)=>{
    try {
        const currentUser = req.user._id;
        const seller = req.params.id;
        if(currentUser.toString() !== seller){
            return res.status(404).send({message:"you can only view Your Lested Shoes",success:false})
        }
        const sellerShoes = await Shoe.find({seller});
        if(!sellerShoes || sellerShoes.length===0){
            return res.status(404).send({message:"0 Show Listed For Selling",success:false});
        }
        res.status(200).send({
            success:false,
            sellerShoes
        })
    } catch (error) {
        console.log(error);
    res.status(500).send({message:`Internal Server Error ${error}`,success:false}) 
    }
}