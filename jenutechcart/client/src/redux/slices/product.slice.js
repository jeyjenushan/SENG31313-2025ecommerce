import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//Async thunk to fetch Products by giters and conditions
export const fetchProductsByFilters=createAsyncThunk("products/fetchByFilters",async({colors,minPrice,maxPrice,sortBy,search,limit,
            category,material,room,country_of_origin,
     })=>{
    const query=new URLSearchParams()

    if(colors) query.append("colors",colors)
    if(minPrice) query.append("minPrice",minPrice)
    if(maxPrice) query.append("maxPrice",maxPrice)
    if(sortBy) query.append("sortBy",sortBy)
    if(search) query.append("search",search)
          if(limit)query.append("limit",limit)
    if(category) query.append("category",category)
    if(material) query.append("material",material)
    if(room) query.append("room",room)
            if(country_of_origin) query.append("country_of_origin",country_of_origin)
  

    const {data}=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`)

    console.log(data)

    return data;

})



//Async thunk to fetch a single product by ID
export const fetchProductDetails=createAsyncThunk("products/fetchProductDetails",async(id)=>{
      const {data}=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)

    console.log("data",data)

    return data;


})

//Async thunk to fetch a similar products 
export const fetchSimilarProducts=createAsyncThunk("products/fetchSimilarProducts",async({id})=>{
      const {data}=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`)

    console.log(data)

    return data;


})

//Async Thunk to arrivalProducts
export const fetchArrivalProducts = createAsyncThunk(
  "products/fetchArrivalProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
      console.log("API Response:", data);
      
      if (!data) {
        return rejectWithValue({ message: 'No data received' });
      }
      
      return data;
    } catch (error) {
      console.error("Error fetching arrival products:", error);
      return rejectWithValue({ 
        message: error.response?.data?.message || error.message 
      });
    }
  }
);

//Async Thunk to bestSellerProducts
export const fetchBestSellerProduct=createAsyncThunk("products/fetchBestSellerProducts",async({id})=>{
      const {data}=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)

    console.log(data)

    return data;


})




const productSlice=createSlice({
    name:"products",
    initialState:{
        products:[],
        selectedProduct:null,
        similarProducts:[],
        arrivalsProducts:[],
        loading:false,
        error:null,
        isUpdated:false,
        filters:{
            colors:"",
            minPrice:"",
            maxPrice:"",
            sortBy:"",
            search:"",
            category:"",
            material:"",
            room:"",
            country_of_origin:"",
     

        }
    },
    reducers:{
        setFilters:(state,action)=>{
            state.filters={...state.filters,...action.payload}
        },
        clearFilters:(state)=>{
            state.filters={
        colors:"",
            minPrice:"",
            maxPrice:"",
            sortBy:"",
            search:"",
            category:"",
            material:"",
            room:"",
            country_of_origin:"",
            }
        }

    },
    extraReducers:(builder)=>{
        builder
        //handle fetching products with filter
        .addCase(fetchProductsByFilters.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchProductsByFilters.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=Array.isArray(action.payload)?action.payload:[];
        })
        .addCase(fetchProductsByFilters.rejected,(state,action)=>{
            state.loading=false;
              state.error = (
                action.payload?.message ||    // From rejectWithValue
                action.error?.message ||      // From the original error
                'No Products found'               // Default fallback
            )
          
        })
        //handle fetching single product details 
        .addCase(fetchProductDetails.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.selectedProduct=action.payload
        })
        .addCase(fetchProductDetails.rejected,(state,action)=>{
            state.loading=false;
              state.error = (
                action.payload?.message ||    // From rejectWithValue
                action.error?.message ||      // From the original error
                'No Products found'               // Default fallback
            )
          
        })

             //handle fetching similar product details 
        .addCase(fetchSimilarProducts.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchSimilarProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.similarProducts=action.payload
        })
        .addCase(fetchSimilarProducts.rejected,(state,action)=>{
            state.loading=false;
              state.error = (
                action.payload?.message ||    // From rejectWithValue
                action.error?.message ||      // From the original error
                'No Products found'               // Default fallback
            )
          
        })


        //handle fetching arrival products
        .addCase(fetchArrivalProducts.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchArrivalProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.arrivalsProducts=Array.isArray(action.payload)?action.payload:[];
        })
        .addCase(fetchArrivalProducts.rejected,(state,action)=>{
            state.loading=false;
              state.error = (
                action.payload?.message ||    // From rejectWithValue
                action.error?.message ||      // From the original error
                'No Products found'               // Default fallback
            )
          
        })
    }
})

export const {setFilters,clearFilters}=productSlice.actions
export default productSlice.reducer;



