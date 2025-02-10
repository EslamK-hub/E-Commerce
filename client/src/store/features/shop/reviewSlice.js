import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    reviews: [],
};

export const addReview = createAsyncThunk(
    "/review/add-review",
    async (formdata) => {
        const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/shop/review/add`,
            formdata
        );

        return response.data;
    }
);

export const getReviews = createAsyncThunk("/order/get-reviews", async (id) => {
    const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/shop/review/${id}`
    );

    return response.data;
});

const reviewSlice = createSlice({
    name: "reviewSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = action.payload.data || [];
            })
            .addCase(getReviews.rejected, (state) => {
                state.isLoading = false;
                state.reviews = [];
            });
    },
});

export default reviewSlice.reducer;
