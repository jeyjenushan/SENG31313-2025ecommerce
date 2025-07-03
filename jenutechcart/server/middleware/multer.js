const multer=require("multer")


//store files in memory
const storage=multer.memoryStorage()

//only accept images
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith("image/")){
        cb(null,true)
    }else{
         cb(new Error('Only images (JPEG, PNG, etc.) are allowed!'), false);
    }
}


//Configure Multer
const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{fileSize:5*1024*1024}
})


// Handle Multer errors (e.g., file too large)
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};


module.exports={
    upload,handleMulterError
}