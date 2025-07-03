const mongoose=require("mongoose")
const cartItem = require("./cartItem.model")


const CartSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        products:[cartItem],
        totalPrice:{
            type:Number,
            required:true,
            default:0
        }
    },
    {timestamps:true}
)

module.exports=mongoose.model("Cart",CartSchema)