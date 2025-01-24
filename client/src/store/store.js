import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import adminProductsSlice from "./features/admin/productsSlice";
import shoppingProductsSlice from "./features/shop/productsSlice";
import shoppingCartSlice from "./features/shop/cartSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shopProducts: shoppingProductsSlice,
        shopCart: shoppingCartSlice,
    },
});

export default store;