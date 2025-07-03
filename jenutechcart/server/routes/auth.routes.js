const express=require("express")
const { signup, login, logout, getPersonalData } = require("../controllers/auth.controller")
const { upload, handleMulterError } = require("../middleware/multer")
const { protectRoute } = require("../middleware/authMiddleware")

const router=express.Router()


router.post("/signup",upload.single("image"),handleMulterError,signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/profile",protectRoute,getPersonalData)


module.exports=router