const mongoose=require("mongoose")


const connectToDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Mongodb connected successfully")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
        
    }
}

module.exports=connectToDB