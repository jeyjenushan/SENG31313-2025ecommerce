const cloudinary=require("cloudinary").v2
const streamifier=require("streamifier")


require("dotenv").config()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

//upload from buffer(since multer gives us a buffer)
const uploadToCloudinary=(buffer)=>{
    return new Promise((resolve,reject)=>{
        const uploadStream=cloudinary.uploader.upload_stream({
            folder:"user_profile_images"
        },(error,result)=>{
            if(error)reject(error);
            else resolve(result)
        })
        streamifier.createReadStream(buffer).pipe(uploadStream)
    })
}


module.exports={
    uploadToCloudinary
}