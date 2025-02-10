import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    addressList: [],
};

export const addAddress = createAsyncThunk(
    "/address/add-address",
    async (formDate) => {
        const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/shop/address/add`,
            formDate
        );
        return response?.data;
    }
);

export const getAllAddress = createAsyncThunk(
    "/address/get-all-address",
    async (userId) => {
        const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/api/shop/address/get/${userId}`
        );
        return response?.data;
    }
);

export const updateAddress = createAsyncThunk(
    "/address/update-address",
    async ({ userId, addressId, formData }) => {
        const response = await axios.put(
            `${import.meta.env.VITE_SERVER_URL}/api/shop/address/update/${userId}/${addressId}`,
            formData
        );
        return response?.data;
    }
);

export const deleteAddress = createAsyncThunk(
    "/address/delete-address",
    async ({ userId, addressId }) => {
        const response = await axios.delete(
            `${import.meta.env.VITE_SERVER_URL}/api/shop/address/delete/${userId}/${addressId}`
        );
        return response?.data;
    }
);

const shoppingAddressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addAddress.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addAddress.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getAllAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(getAllAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            });
    },
});

export default shoppingAddressSlice.reducer;
