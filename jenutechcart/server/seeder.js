const mongoose=require("mongoose")
const dotenv=require("dotenv")
const ProductModel=require("./models/product.model")
const UserModel=require("./models/user.model")
const products=require("./data/product")
const CartModel=require("./models/cart.model")


dotenv.config()

mongoose.connect(process.env.MONGODB_URL);


const seekData=async()=>{
    try {
        await ProductModel.deleteMany();
        await UserModel.deleteMany()
        await CartModel.deleteMany()


        const createUser=await UserModel.create({
            name:"Admin User",
            email:"admin@example.com",
            password:"123456",
            role:"admin"
        })
        const userID=createUser._id;

        const sampleProducts=products.map((product)=>{
            return {...product,user:userID}
        })

        //insert
        await ProductModel.insertMany(sampleProducts)

        console.log("Product data seeded successfully")
        process.exit()


    } catch (error) {
        console.log("Error seeding the data",error)
        process.exit(1)
    }
}
seekData()