import jwt from 'jsonwebtoken'

const JWt = async(userID ,res)=>{
    const token = jwt.sign({userID},process.env.JWT_SECRET,{
        expiresIn:"365d"
    })
    res.cookie("Jwt",token,{
        maxAge: 356*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
    })
}

export default JWt