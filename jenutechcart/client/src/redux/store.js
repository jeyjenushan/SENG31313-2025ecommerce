import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/auth.slice"
import productReducer from "./slices/product.slice"

//Create the redux store
const store=configureStore({
  reducer:{
    auth:authReducer,
    products:productReducer
  }
})

export default store;