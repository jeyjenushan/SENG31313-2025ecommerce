const express=require("express")
const { addSubscriber } = require("../controllers/subscriber.controller")


const router=express.Router()


router.post("/",addSubscriber)


module.exports=router