import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"




const initialState={
    loading:false,
    error:null,
    success:false

}



export const addSubscriber=createAsyncThunk("Subscriber/add",async(userEmail,{rejectWithValue})=>{
    try {
        const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscriber`,{email:userEmail})
return data;
        
    } catch (error) {
        return rejectWithValue(error.response.data)
        
    }
})


const subScriberSlice=createSlice({
    name:"Subscriber",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder

        .addCase(addSubscriber.fulfilled,(state)=>{
            state.loading=false;
            state.error=null;
            state.success=true
            
        })
        .addCase(addSubscriber.rejected,(state,action)=>{
                    state.loading=false,
                    state.success=false
                    state.error=(action.payload?.message || action.error?.message|| "Some wrong happen adding to the subscriber")
                })
    }


})

export default subScriberSlice.reducer