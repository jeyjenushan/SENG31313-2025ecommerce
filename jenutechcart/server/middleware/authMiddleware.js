const jwt=require("jsonwebtoken");
const  User  = require("../models/user.model");

const protectRoute=async(req,res,next)=>{

    try {
        
        const token=req.cookies.jwt;
        if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}
        const user = await User.findById(decoded.user.id).select("-password");
        req.user=user;
        next()

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }


}

const adminRoute=(req,res,next)=>{
        if(req.user && req.user.role=="admin"){
        next()
    }else{
        res.status(403).json({message:"Not authorized as an admin"})
    }
}


module.exports={
    protectRoute,adminRoute
}