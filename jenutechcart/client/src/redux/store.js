import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/auth.slice"
import productReducer from "./slices/product.slice"
import cartReducer from "./slices/cart.slice"
import subscriberReducer from "./slices/subscriber.slice"

//Create the redux store
const store=configureStore({
  reducer:{
    auth:authReducer,
    products:productReducer,
    cart:cartReducer,
    Subscriber:subscriberReducer
  }
})

export default store;