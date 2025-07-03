const express=require("express")
const { newArrivalProduts, bestSellerProducts, getSingleProduct, similarProducts, getAllProducts } = require("../controllers/product.controller")
const router=express.Router()

router.get("/",getAllProducts)
router.get("/new-arrivals",newArrivalProduts)
router.get("/best-seller",bestSellerProducts)
router.get("/:id",getSingleProduct)
router.get("/similar/:id",similarProducts)

module.exports=router

