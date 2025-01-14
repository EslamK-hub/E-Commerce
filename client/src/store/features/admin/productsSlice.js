import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
};

export const addProduct = createAsyncThunk(
    "/products/add-product",
    async (formData) => {
        const result = await axios.post(
            "http://localhost:5000/api/admin/products/add",
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return result?.data;
    }
);

export const getAllProducts = createAsyncThunk(
    "/products/get-all-product",
    async () => {
        const result = await axios.get(
            "http://localhost:5000/api/admin/products/get"
        );
        return result?.data;
    }
);

export const updateProduct = createAsyncThunk(
    "/products/update-product",
    async ({ id, formData }) => {
        const result = await axios.put(
            `http://localhost:5000/api/admin/products/update/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return result?.data;
    }
);

export const deleteProduct = createAsyncThunk(
    "/products/delete-product",
    async (id) => {
        const result = await axios.delete(
            `http://localhost:5000/api/admin/products/delete/${id}`
        );
        return result?.data;
    }
);

const adminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data;
            })
            .addCase(getAllProducts.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            });
    },
});

export default adminProductsSlice.reducer;