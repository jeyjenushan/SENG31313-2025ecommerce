import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"


//Helper function to load cart from localStorage
const loadCartFromStorage=()=>{
    const storedCart=localStorage.getItem("cart")
    return storedCart ? JSON.parse(storedCart):{products:[]};
}

//Helper function to save cart to localstorage
const saveCartToStorage=(cart)=>{
    localStorage.setItem("cart",JSON.stringify(cart))
}

//Fetch cart for a user or guest
export const fetchCart=createAsyncThunk("cart/fetchCart",async({userId,guestId},{rejectWithValue})=>{
    try {
        const {data}=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{},{
          withCredentials: true, 
          headers: {
            'Content-Type': 'application/json',
          }
    })
      console.log(data)
      return data

    } catch (error) {
        console.error(error)
        return rejectWithValue(error.response.data)
    }
})


//Add an item to the cart for a user or guest
export const addToCart=createAsyncThunk("cart/addToCart",async({productId,quantity,category,color},{rejectWithValue})=>{
    try {
        const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{productId,quantity,category,color}, {
          withCredentials: true, 
          headers: {
            'Content-Type': 'application/json',
          }
        })
      console.log(data)
      return data

    } catch (error) {
        console.error(error)
        return rejectWithValue(error.response.data)
    }
})


//Update the quantity of an item in the cart
export const updateCartItemQuantity=createAsyncThunk("cart/updateCart",async({productId,quantity,category,color},{rejectWithValue})=>{
    try {
    
        const {data}=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{productId,quantity,category,color},     {
          withCredentials: true, 
          headers: {
            'Content-Type': 'application/json',
          }
        })
      console.log("Updated cart",data)
      return data

    } catch (error) {
        console.error(error)
        return rejectWithValue(error.response.data)
    }
})



//remove an item from the cart
export const removeFromCart=createAsyncThunk("cart/removeFromCart",async({productId,color,category},{rejectWithValue})=>{
    try {
     const { data } = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        data: { productId, color, category },
        withCredentials: true, // Include credentials (cookies)
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(data)
      return data

    } catch (error) {
        console.error(error)
        return rejectWithValue(error.response.data)
    }
})


//remove an item from the cart
export const removeAllItems=createAsyncThunk("cart/removeFromAllCart",async(_,{rejectWithValue})=>{
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/all`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      console.log(data)
      return data

    } catch (error) {
        console.error(error)
        return rejectWithValue(error.response.data)
    }
})




const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cart:loadCartFromStorage(),
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder
          .addCase(fetchCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
          })
            .addCase(fetchCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToStorage(action.payload)
          })
            .addCase(fetchCart.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message || "Failed to fetch the cart";
          })
            .addCase(addToCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
          })
            .addCase(addToCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToStorage(action.payload)
          })
            .addCase(addToCart.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to add the cart";
          })
            .addCase(updateCartItemQuantity.pending,(state)=>{
            state.loading=true;
            state.error=null;
          })
            .addCase(updateCartItemQuantity.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToStorage(action.payload)
          })
            .addCase(updateCartItemQuantity.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to update item quantity";
          })
            .addCase(removeFromCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
          })
            .addCase(removeFromCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToStorage(action.payload)
          })
            .addCase(removeFromCart.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to remove item quantity";
          })
          .addCase(removeAllItems.fulfilled,(state,action)=>{
            state.loading=false;
               state.cart = {products: []};
            localStorage.removeItem("cart")
          })
    }
})


export const {clearCart}=cartSlice.actions;
export default cartSlice.reducer;