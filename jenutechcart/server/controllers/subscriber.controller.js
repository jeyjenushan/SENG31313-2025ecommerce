const Subscriber=require("../models/subscriber.model")


const addSubscriber=async(req,res)=>{
    try {
        const {email}=req.body;
        if(!email){
            return res.status(400).json({message:"Email not found please check again"})
        }
        const subscriber=await Subscriber.findOne({email})
        if(subscriber){
            return res.status(400).json({message:"The user has already subscribed"})
        }
        const newSubscriber=new Subscriber({email})
        await newSubscriber.save()
        res.status(200).json({message:"The Subscriber can be added successfully"})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }


}

module.exports={
    addSubscriber
}