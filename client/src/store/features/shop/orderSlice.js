import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    approvalURL: null,
    orderId: null,
};

export const createOrder = createAsyncThunk(
    "/order/create-order",
    async (orderData) => {
        const response = await axios.post(
            "http://localhost:5000/api/shop/order/create",
            orderData
        );
        return response.data;
    }
);

const shoppingOrderSlice = createSlice({
    name: "shoppingOrderSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approvalURL = action.payload.approvalURL;
                state.orderId = action.payload.orderId;
            })
            .addCase(createOrder.rejected, (state) => {
                state.isLoading = false;
                state.approvalURL = null;
                state.orderId = null;
            });
    },
});

export default shoppingOrderSlice.reducer;
