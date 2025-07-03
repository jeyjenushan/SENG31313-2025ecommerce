const jwt=require("jsonwebtoken")

const generateTokenAndSetCookie=(payload,res)=>{
    const token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"1d"
    })

    res.cookie("jwt",token,{
        maxAge:1*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !=="development"

    })
    return token
}

module.exports=generateTokenAndSetCookie