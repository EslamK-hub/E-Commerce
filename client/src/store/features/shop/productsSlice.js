import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
};

export const getAllFilteredProducts = createAsyncThunk(
    "/products/get-all-product",
    async ({ filterParams, sortParams }) => {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams
        })
        const response = await axios.get(
            `http://localhost:5000/api/shop/products/get?${query}`
        );
        return response?.data;
    }
);

const shoppingProductsSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllFilteredProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data;
            })
            .addCase(getAllFilteredProducts.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            });
    },
});

export default shoppingProductsSlice.reducer;