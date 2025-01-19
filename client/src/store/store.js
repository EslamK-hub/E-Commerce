import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import adminProductsSlice from "./features/admin/productsSlice";
import shoppingProductsSlice from "./features/shop/productsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shopProducts: shoppingProductsSlice,
    },
});

export default store;