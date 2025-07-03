const express=require("express")
const Product=require("../models/product.model")
const Cart = require("../models/cart.model")
const jwt=require("jsonwebtoken")




//Helper function to get a cart by userId
const getCart=async(userId)=>{
    console.log(userId)
     if(userId){
        userId=userId.trim()
        console.log("user",await Cart.findOne({user:userId}))
        return await Cart.findOne({user:userId})
    }
    return null;
}

//@route Post /api/cart
//@desc Add a product to the cart for a guest or logged in user
//@access Public
const createCart= async(req,res)=>{
        const token=req.cookies.jwt;
    const userId = token ? jwt.verify(token, process.env.JWT_SECRET).user.id : null;
    const {productId,quantity,category,color}=req.body;
    try {
        const product=await Product.findById(productId)
        if(!product)return res.status(401).json({message:"Product not found"})
        
        let cart=await getCart(userId)    
        if(cart){
            const productIndex=cart.products.findIndex(
                (p)=>p.productId.toString()==productId.toString()  &&p.color==color && p.category==category
            )

            if(productIndex>-1){
                //if the product already exists,update the quantity
                cart.products[productIndex].quantity+=quantity
            }else{
                //add new product
                cart.products.push({
                    productId,
                    name:product.name,
                    image:product.images[0].url,
                    price:product.price,
                    color,quantity,
                    category:product.category

                })
            }

            //Recalculate total Price
        cart.totalPrice=cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0)

        await cart.save()
        return res.status(200).json(cart)
        }else{
            //create a new cart for guest or user
            const newCart=await Cart.create({
                user: userId? userId:undefined,
                products:[
                    {
                        productId,
                        name:product.name,
                        image:product.images[0].url,
                        price:product.price,
                        color,
                        quantity,
                        category:product.category
                    }
                ],
                totalPrice:product.price*quantity


            })
 return res.status(200).json(newCart)
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({message:error.message})
    }

}


//update the product quantity
const updateCart=async(req,res)=>{
        const token=req.cookies.jwt;
    const userId = token ? jwt.verify(token, process.env.JWT_SECRET).user.id : null;
    const {productId,quantity,color,category}=req.body;
    try {
        let cart=await getCart(userId)
        if(!cart)return res.status(404).json({message:"Cart not found"});
         
       const productIndex = cart.products.findIndex(
  (p) => p.productId.equals(productId) && p.color === color && p.category === category
);

    

        if(productIndex>-1){
            //Update Quantity
            if(quantity>0){
            cart.products[productIndex].quantity=quantity;

            }else{
                cart.products.splice(productIndex,1)

            }
            cart.totalPrice=cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0)
            await cart.save()
            return res.status(200).json(cart)
        }else{
                 return res.status(404).json({message:"Product not found in cart"})
        }




    } catch (error) {
        console.error(error)
        return res.status(500).json({message:error.message})
        
    }

}

//Delete the product from cart
const deleteCart=async(req,res)=>{
            const token=req.cookies.jwt;
    const userId = token ? jwt.verify(token, process.env.JWT_SECRET).user.id : null;
const {productId,color,category}=req.body;
try {
    
    let cart=await getCart(userId)

    if(!cart)return res.status(404).json({message:"Cart not found"});
    const productIndex=cart.products.findIndex((p)=>p.productId.toString()==productId  && p.color==color && p.category==category)

    if(productIndex>-1){
        cart.products.splice(productIndex,1);
        cart.totalPrice=cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0);
        await cart.save();
        return res.status(200).json(cart)

    }else{
        return res.status(404).json({message:"Product not found"})
      }

} catch (error) {
        console.error(error)
        return res.status(500).json({message:error.message})
        
    }



}

//@route GET /api/cart
//@desc GET logged-in user's or guest user's cart
//@access Public

const loggedUserCart=async(req,res)=>{
     const token=req.cookies.jwt;
    const userId = token ? jwt.verify(token, process.env.JWT_SECRET).user.id : null;
    try {
        let cart=await getCart(userId)
        if(!cart)return res.status(404).json({message:"Cart not found"});
         res.json(cart)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:error.message})
        
    }

}













module.exports={
    createCart,
    loggedUserCart,
    deleteCart,
    updateCart
}