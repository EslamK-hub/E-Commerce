import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null,
};

export const getAllFilteredProducts = createAsyncThunk(
    "/products/get-all-product",
    async ({ filterParams, sortParams }) => {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams,
        });
        const response = await axios.get(
            `http://localhost:5000/api/shop/products/get?${query}`
        );
        return response?.data;
    }
);

export const getProductDetails = createAsyncThunk(
    "/products/get-product-details",
    async (id) => {
        const response = await axios.get(
            `http://localhost:5000/api/shop/products/get/${id}`
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
            })
            .addCase(getProductDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productDetails = action.payload.data;
            })
            .addCase(getProductDetails.rejected, (state) => {
                state.isLoading = false;
                state.productDetails = null;
            });
    },
});

export default shoppingProductsSlice.reducer;
