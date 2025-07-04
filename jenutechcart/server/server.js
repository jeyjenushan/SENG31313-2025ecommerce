const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
const connectToDB=require("./db/connectToMongoDb")
const authRoutes=require("./routes/auth.routes")
const productRoutes=require("./routes/product.routes")
const cartRoutes=require("./routes/cart.routes")
const cookieParser = require("cookie-parser")


const app=express()
app.use(express.json())
const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));

dotenv.config()
const PORT=process.env.PORT


app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)







app.listen(PORT,()=>{
          connectToDB()
        console.log(`The server is running port number on ${PORT}`)
})