const Product=require("../models/product.model")


const createProduct=async(req,res)=>{
    try {
        const{name,description,category,material,room,brand,price,discountPrice,original_price,rating,num_reviews,images,countInStock,colorss,country_of_origin,weight}=req.body

        const product=new Product({name,description,category,material,room,brand,price,discountPrice,original_price,rating,num_reviews,images,countInStock,colorss,country_of_origin,weight,user:req.user._id})
        
        const createdProduct=await product.save()
        res.status(201).json(createdProduct)

    } catch (error) {
                console.error(error)
        res.status(500).send("Internal Server Error")
    }
}



//retrieve all products
const getAllProducts=async(req,res)=>{
    try {
        const {colors,minPrice,maxPrice,sortBy,search,limit,
            category,material,room,country_of_origin,
     }=req.query;

     let query={}



  if (category && category.toLowerCase() !== "all") {
          query.category=category;
  }
  if(material){
    query.material=material
  }
  if(room){
    query.room=room
  }
    if(country_of_origin){
    query.country_of_origin=country_of_origin
  }

   if(minPrice|| maxPrice){
    query.price={}
    if(minPrice){
        query.price.$gte=Number(minPrice)
    }
    if(maxPrice){
        query.price.$lte=Number(maxPrice)
    }
   }
if (colors) {
    const colorsArray = typeof colors === 'string' 
        ? colors.split(',').map(c => c.trim()) 
        : colors;
    query.colors = { $in: colorsArray };
}

     if(search){
        query.$or=[
            {name:{$regex:search,$options:"i"}},
             {description:{$regex:search,$options:"i"}},
        ]
    }


        
    let sort={}

    if(sortBy){
        switch(sortBy){
            case "priceAsc":
                sort={price:1};
                break;
            case "priceDesc":
                sort={price:-1};
                break;
            case "popularity":
                sort={rating:-1};
            default:
                break;

        }
    }

     //fetch products and apply sorting and limit
let products=await Product.find(query)
                .sort(sort) 
             .limit(Number(limit)|| 0); 

             res.json(products)


        
    } catch (error) {
             console.error(error)
        res.status(500).json({message:error.message})
    }
}




//retrieve latest products
const newArrivalProduts=async(req,res)=>{
try {
    const newArrivals=await Product.find().sort({createdAt:-1}).limit(8)
    res.status(200).json(newArrivals)
    
} catch (error) {
        console.error(error)
        res.status(500).json({message:error.message})
}
}

//retrieve seller products
const bestSellerProducts=async(req,res)=>{
    try{
        const bestSeller=await Product.findOne().sort({rating:-1})
        if(bestSeller){
            res.json(bestSeller)
        }else{
            res.status(404).json({message:"No best seller found"})
        }

    }catch(error){
   console.error(error)
        res.status(500).json({message:error.message})
    }
}


//retrieve single product
const getSingleProduct=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        if(product){
            res.json(product)
        }else{
        res.status(400).json({message:"Product Not found"})
        }

    } catch (error) {
        console.error(error.message)
         res.status(500).json({message:error.message})
        
    }

}

//retrieve similar products
const similarProducts=async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findById(id);
        if(!product){
            return res.status(404).json({message:"Product not found"})
        }
        const similarProducts=await Product.find({
            _id:{$ne:id},            
            category:product.category
        }).limit(4)
        res.json(similarProducts)




    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }

}


module.exports={
    similarProducts,newArrivalProduts,
    getSingleProduct,bestSellerProducts,
    getAllProducts,createProduct
}