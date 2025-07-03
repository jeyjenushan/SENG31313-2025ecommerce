const express=require("express")
const { newArrivalProduts, bestSellerProducts, getSingleProduct, similarProducts, getAllProducts, createProduct } = require("../controllers/product.controller")
const { protectRoute, adminRoute } = require("../middleware/authMiddleware")
const router=express.Router()


router.post("/",protectRoute,adminRoute,createProduct)
router.get("/",getAllProducts)
router.get("/:id",getSingleProduct)
router.get("/similar/:id",similarProducts)
router.get("/new-arrivals",newArrivalProduts)
router.get("/best-seller",bestSellerProducts)


module.exports=router

