import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"


//Retrieve user info and token from localstorage if available
const userFromStorage=localStorage.getItem("userInfo")?
JSON.parse(localStorage.getItem("userInfo")):null;


const initialState={
    user:userFromStorage,
    loading:false,
    error:null
}


//LoginUser
export const loginUser=createAsyncThunk("auth/loginUser",async(userData,{rejectWithValue})=>{

    try {
        const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,userData,{
            withCredentials:true
        })
  if (data.user) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
      }

        return data.user;
        
    } catch (error) {
        return rejectWithValue(error.response.data)
        
    }



})

export const registerUser=createAsyncThunk("auth/registerUser",async(userData,{rejectWithValue})=>{

    try {

             // Create FormData object to handle file upload
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("confirmPassword", userData.confirmPassword);
      
      // Append the image file if it exists
      if (userData.image) {
        formData.append("image", userData.image);
      }

        const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,formData,{
            withCredentials:true,
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
  if (data.user) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
      }

        return data.user;
        
    } catch (error) {
        return rejectWithValue(error.response.data)
        
    }



})


export const logoutUser=createAsyncThunk("auth/logOutUser",async(_,{rejectWithValue})=>{

    try {
        const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,{},{
            withCredentials:true
        })

// Clear user info from localStorage on successful logout
      localStorage.removeItem("userInfo");

      return data;
        
    } catch (error) {
        return rejectWithValue(error.response.data)
        
    }



})


export const getProfileInformation=createAsyncThunk("auth/logOutUser",async(_,{rejectWithValue})=>{

    try {
        const {data}=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,{},{
            withCredentials:true
        })



      return data.user;
        
    } catch (error) {
        return rejectWithValue(error.response.data)
        
    }



})



//SLICE
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false,
            state.user=action.payload
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false,
            state.error=(action.payload?.message || action.error?.message|| "Login Failed")
        })
        .addCase(registerUser.pending,(state)=>{
            state.loading=true
            state.error=null
          })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
          })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading=false
               state.error = (
                action.payload?.message ||
                action.error?.message ||
                'Registration failed'
            )
          })
          .addCase(logoutUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=null
          })
        .addCase(getProfileInformation.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload
          })

    }
})


export default authSlice.reducer;
