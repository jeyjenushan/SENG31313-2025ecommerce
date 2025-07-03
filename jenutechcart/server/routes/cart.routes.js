const express=require("express")
const { protectRoute } = require("../middleware/authMiddleware")
const { createCart, loggedUserCart, deleteCart, updateCart } = require("../controllers/cart.controller")

const router=express.Router()


router.post("/",protectRoute,createCart)
router.get("/",protectRoute,loggedUserCart)
router.delete("/",protectRoute,deleteCart)
router.put("/",protectRoute,updateCart)

module.exports=router