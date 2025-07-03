const mongoose=require("mongoose")

const CartItemSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    name:String,
    image:String,
    price:String,
    size:String,
    color:String,
    quantity:{
        type:Number,
        default:1
    }
})


const cartItem=mongoose.model("CartItem",CartItemSchema)
module.exports=cartItem