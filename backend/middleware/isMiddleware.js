import jwt from "jsonwebtoken";
import User from "../Schema/userSchema.js";

const isMiddleWare =async (req, res, next) => {
    try {
        
        const token = req.cookies.Jwt;
        if (!token) return res.status(500).send({ success: false, message: "User Unauthorize" })
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if (!decode) return res.status(500).send({ success: false, message: "User Unauthorize -Invalid Token" })
        const user = await User.findById(decode.userID).select("-password");
        if (!user) return res.status(500).send({ success: false, message: "User not found" })
        req.user = user;
        next();

    } catch (error) {
        console.log(`error in isMiddleware ${error.message}`);
        res.status(500).send({
            success: false,
            message: error
        })
    }

}

export default isMiddleWare