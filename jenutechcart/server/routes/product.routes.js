const express=require("express")
const {  bestSellerProducts, getSingleProduct, similarProducts, getAllProducts, createProduct, getNewArrivalProducts } = require("../controllers/product.controller")
const { protectRoute, adminRoute } = require("../middleware/authMiddleware")
const router=express.Router()


router.post("/",protectRoute,adminRoute,createProduct)
router.get("/",getAllProducts)
router.get("/new-arrivals",getNewArrivalProducts)
router.get("/:id",getSingleProduct)
router.get("/similar/:id",similarProducts)

router.get("/best-seller",bestSellerProducts)


module.exports=router

