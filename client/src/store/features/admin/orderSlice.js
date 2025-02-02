import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    orderList: [],
    orderDetails: null,
};

export const getAllOrdersAllUsers = createAsyncThunk(
    "/order/get-all-orders-all-users",
    async () => {
        const response = await axios.get(
            "http://localhost:5000/api/admin/orders/get"
        );
        return response.data;
    }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
    "/order/get-order-details-for-admin",
    async (id) => {
        const response = await axios.get(
            `http://localhost:5000/api/admin/orders/details/${id}`
        );
        return response.data;
    }
);

export const updateOrderStatus = createAsyncThunk(
    "/order/update-order-status",
    async ({ id, orderStatus }) => {
        const response = await axios.put(
            `http://localhost:5000/api/admin/orders/update/${id}`,
            {
                orderStatus,
            }
        );

        return response.data;
    }
);

const adminOrderSlice = createSlice({
    name: "adminOrderSlice",
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.orderDetails = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrdersAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrdersAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderList = action.payload.data;
            })
            .addCase(getAllOrdersAllUsers.rejected, (state) => {
                state.isLoading = false;
                state.orderList = [];
            })
            .addCase(getOrderDetailsForAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data;
            })
            .addCase(getOrderDetailsForAdmin.rejected, (state) => {
                state.isLoading = false;
                state.orderDetails = null;
            });
    },
});

export const { resetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
