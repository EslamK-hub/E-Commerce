import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

export const register = createAsyncThunk("/auth/register", async (formData) => {
    const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/register`,
        formData,
        { withCredentials: true }
    );
    return response.data;
});

export const login = createAsyncThunk("/auth/login", async (formData) => {
    const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        formData,
        { withCredentials: true }
    );
    return response.data;
});

export const logout = createAsyncThunk("/auth/logout", async () => {
    const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,
        {},
        {
            withCredentials: true,
        }
    );
    return response.data;
});

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/check-auth`,
        {
            withCredentials: true,
            headers: {
                "Cache-Control":
                    "no-store, no-cache, must-revalidate, proxy-revalidate",
            },
        }
    );
    return response.data;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(register.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success
                    ? action.payload.user
                    : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success
                    ? action.payload.user
                    : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
