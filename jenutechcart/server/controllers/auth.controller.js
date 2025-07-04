const User=require("../models/user.model");
const { uploadToCloudinary } = require("../utils/cloudinary");
const generateTokenAndSetCookie = require("../utils/generateToken")



const signup=async(req,res)=>{
    try{
        const {name,email,password,confirmPassword}=req.body
        const image=req.file;


        
    // Validate required fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required!" });
    }

        if(password!=confirmPassword){
            return res.status(400).json({error:"Password don't match"})
        }

        const user=await User.findOne({email})
        if(user){
                return res.status(400).json({error:"Username already exists"})
        }

        //Handle Image
        let imageUrl="";
        let imagePublicId="";

        if(image){
            try {
                const result = await uploadToCloudinary(image.buffer);
               imageUrl = result.secure_url;
              imagePublicId = result.public_id;
            } catch (error) {
                return res.status(500).json({ error:error.message}); 
            }
        }


        const newUser=new User({name,email,password,image:imageUrl,imagePublicId})
            const payload={user:{id:newUser._id,role:newUser.role}}
        if(newUser){
          const token=  generateTokenAndSetCookie(payload,res)
            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                image:newUser.image,
                role:newUser.role,
                token
            })
        }else{
            res.status(400).json({error:"Invalid user Data"})
        }
  



    }catch(error){
        console.log("Error in signup controller",error.message)
        res.status(500).json({ error: "Internal Server Error"})

    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body

        const user = await User.findOne({ email }).select('+password'); 
        
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await user.matchPassword(password);
        
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
      const payload={user:{id:user._id,role:user.role}}
      const token=  generateTokenAndSetCookie(payload,res)
        res.status(200).json(user)
        

    } catch (error) {
        console.log("Error in login controller",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }

}

const logout=async(req,res)=>{
    try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
           console.log("Error in logput controller",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }

}

const getPersonalData = async (req, res) => {
    try {
       
        console.log(req.user)
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

         
    


      
        res.status(200).json(user);

    } catch (error) {
        console.error("Error in getPersonalData:", error.message);
        res.status(500).json({ 
            error: "Failed to fetch user data",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};




module.exports={
    signup,login,logout,getPersonalData
}