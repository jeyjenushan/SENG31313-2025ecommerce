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


// Helper function to update product stock
const updateProductStock = async (productId, quantityChange) => {
    const product = await Product.findById(productId)
    if (!product) throw new Error("Product not found")
    
    product.countInStock += quantityChange
    if (product.countInStock < 0) {
        throw new Error("Not enough stock available")
    }
    
    await product.save()
    return product
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
        if(!product)return res.status(401).json({message:"Product not found"});

            // Check available stock
        if (product.countInStock < quantity) {
            return res.status(400).json({ message: "Not enough stock available" })
        }
       


        
        let cart=await getCart(userId)    
        if(cart){
            const productIndex=cart.products.findIndex(
                (p)=>p.productId.toString()==productId.toString()  &&p.color==color && p.category==category
            )

            if(productIndex>-1){
                //if the product already exists,update the quantity
            const newTotalQuantity = cart.products[productIndex].quantity + quantity


                if (product.countInStock < newTotalQuantity) {
                    return res.status(400).json({ message: "Not enough stock available for additional quantity" })
                }
  
                  // Update stock for the additional quantity
                await updateProductStock(productId, -quantity)

                    // Update the quantity in cart
                cart.products[productIndex].quantity = newTotalQuantity





            }else{

                 // Add new product to cart
                await updateProductStock(productId, -quantity)

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

            // Create a new cart for guest or user
            await updateProductStock(productId, -quantity)
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
        
            const currentItem = cart.products[productIndex]
            const product = await Product.findById(productId)    
            
            //Update Quantity
            if(quantity>0){
            
            const quantityDifference = quantity - currentItem.quantity;
            if (product.countInStock < quantityDifference) {
                    return res.status(400).json({ message: "Not enough stock available" })
                }
                
                            // Update the stock
                await updateProductStock(productId, -quantityDifference)
                
                // Update quantity in cart
                currentItem.quantity = quantity    

            }else{
              await updateProductStock(productId, currentItem.quantity)
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
                    // Return the stock to inventory
        const item = cart.products[productIndex]
        await updateProductStock(productId, item.quantity)
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