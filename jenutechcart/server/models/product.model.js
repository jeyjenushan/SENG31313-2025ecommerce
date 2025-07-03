const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },

    category:{
        type:String,
        enum: ["Furniture", "Cookware", "Smart Home", "Cleaning"],
    },
    material:{
        type:String,
        enum: ["Wood", "Steel", "Ceramic", "Glass", "Plastic", "Bamboo"],
    },
    room:{
        type:String,
        enum: ["Living Room", "Bedroom", "Kitchen", "Bathroom"],
    },
    brand:{
        type:String
    },
    price:{
        type:Number,
        required:true,
     },
    discountPrice:{
       type:Number,
        
    },
    original_price:{
        type:Number
    },
    rating:{
        type:Number
    },
    num_reviews:{
        type:Number
    },
    images:[
        {
           url:{
                type:String,
                required:true
            },
            altText:{
                type:String
            }
        }
    ],
    countInStock:{
        type:Number,
        required:true,
        default:0

    },
    colors:{
        type:[String],
        required:true,
    },
    country_of_origin:{
        type:String
    },
    metaTitle:{
        type:String
    },
    metaDescription:{
        type:String,
    },
    metaKeywords:{
        type:String,
    },
    //it refers to the admin id for creating product admin id
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    weight:Number


},{timestamps:true})



module.exports=mongoose.model("Product",productSchema)