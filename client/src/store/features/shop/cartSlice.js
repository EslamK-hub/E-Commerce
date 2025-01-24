import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartItems: [],
    isLoading: false,
};

export const addCart = createAsyncThunk(
    "cart/add-to-cart",
    async ({ userId, productId, quantity }) => {
        const response = await axios.post(
            "http://localhost:5000/api/shop/cart/add",
            {
                userId,
                productId,
                quantity,
            }
        );
        return response.data;
    }
);

export const getCartItems = createAsyncThunk(
    "cart/get-cart-items",
    async (userId) => {
        const response = await axios.get(
            `http://localhost:5000/api/shop/cart/get/${userId}`
        );
        return response.data;
    }
);

export const updateCartQuantity = createAsyncThunk(
    "cart/update-cart-quantity",
    async ({ userId, productId, quantity }) => {
        const response = await axios.put(
            "http://localhost:5000/api/shop/cart/update-cart",
            {
                userId,
                productId,
                quantity,
            }
        );
        return response.data;
    }
);

export const deleteCartItem = createAsyncThunk(
    "cart/delete-cart-item",
    async ({ userId, productId }) => {
        const response = await axios.delete(
            `http://localhost:5000/api/shop/cart/${userId}/${productId}`
        );
        return response.data;
    }
);

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(addCart.rejected, (state) => {
                state.isLoading = true;
                state.cartItems = [];
            })
            .addCase(getCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(getCartItems.rejected, (state) => {
                state.isLoading = true;
                state.cartItems = [];
            })
            .addCase(updateCartQuantity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(updateCartQuantity.rejected, (state) => {
                state.isLoading = true;
                state.cartItems = [];
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(deleteCartItem.rejected, (state) => {
                state.isLoading = true;
                state.cartItems = [];
            });
    },
});

export default shoppingCartSlice.reducer;