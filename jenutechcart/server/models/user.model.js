const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        unique:true,
        match:[/.+\@.+\..+/,"Please enter a valid email address"]
    },
    password:{
        type:String,
         required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select:false
    },
    image:{
        type:String,
        
    },
    
    role:{
        type:String,
        enum:["customer","admin"],
        default:"customer"
    },
    //managing images in Cloudinary
    imagePublicId:{
        type:String,
        default:""
    }
},
{timestamps:true}
)

//Password hash middleware
userSchema.pre("save",async function(next){
    //because when the document was loaded only expose not update support
       if(!this.isModified("password"))return next;
       try{
          const salt=await bcrypt.genSalt(10);
          this.password=await bcrypt.hash(this.password,salt)
          next()
        }catch(err){
          next(err)
}

})


userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}




module.exports=mongoose.model("User",userSchema)