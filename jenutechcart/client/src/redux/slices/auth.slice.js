import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Retrieve user info from localStorage if available
const userFromStorage = localStorage.getItem("userInfo") 
  ? JSON.parse(localStorage.getItem("userInfo")) 
  : null;

const initialState = {
  user: userFromStorage,
  loading: false,
  error: null,
  isAuthenticated: !!userFromStorage // Set based on presence of user info
};

// Helper function for auth API calls
const authApi = {
  login: (userData) => axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, userData, {
    withCredentials: true
  }),
  register: (formData) => axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" }
  }),
  logout: () => axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {}, {
    withCredentials: true
  }),
  getProfile: () => axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`, {
    withCredentials: true
  })
};

// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await authApi.login(userData);
      if (data.user) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await authApi.register(formData);
      if (data.user) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "auth/logOutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      localStorage.removeItem("userInfo");
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get Profile Information
export const getProfileInformation = createAsyncThunk(
  "auth/getProfileInformation",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authApi.getProfile();
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      return data;
    } catch (error) {
      localStorage.removeItem("userInfo");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Add a reducer to reset auth state
    resetAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login Failed";
      })
      
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      })
      
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      
      // Profile cases
      .addCase(getProfileInformation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfileInformation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load profile";
        state.isAuthenticated = false;
      });
  }
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;