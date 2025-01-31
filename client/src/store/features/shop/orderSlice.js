import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    approvalURL: null,
    orderId: null,
    orderList: [],
    orderDetails: null,
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

export const capturePayment = createAsyncThunk(
    "/order/capture-payment",
    async ({ paymentId, payerId, orderId }) => {
        const response = await axios.post(
            "http://localhost:5000/api/shop/order/capture",
            {
                paymentId,
                payerId,
                orderId,
            }
        );
        return response.data;
    }
);

export const getAllOrdersByUserId = createAsyncThunk(
    "/order/get-all-order-by-user-id",
    async (userId) => {
        const response = await axios.get(
            `http://localhost:5000/api/shop/order/list/${userId}`
        );
        return response.data;
    }
);

export const getOrderDetails = createAsyncThunk(
    "/order/get-order-details",
    async (id) => {
        const response = await axios.get(
            `http://localhost:5000/api/shop/order/details/${id}`
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
                sessionStorage.setItem(
                    "currentOrderId",
                    JSON.stringify(action.payload.orderId)
                );
            })
            .addCase(createOrder.rejected, (state) => {
                state.isLoading = false;
                state.approvalURL = null;
                state.orderId = null;
            })
            .addCase(getAllOrdersByUserId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderList = action.payload.data;
            })
            .addCase(getAllOrdersByUserId.rejected, (state) => {
                state.isLoading = false;
                state.orderList = [];
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data;
            })
            .addCase(getOrderDetails.rejected, (state) => {
                state.isLoading = false;
                state.orderDetails = null;
            });
    },
});

export default shoppingOrderSlice.reducer;
