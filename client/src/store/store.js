import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import adminProductsSlice from "./features/admin/productsSlice";
import shoppingProductsSlice from "./features/shop/productsSlice";
import shoppingCartSlice from "./features/shop/cartSlice";
import shoppingAddressSlice from "./features/shop/addressSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shopProducts: shoppingProductsSlice,
        shopCart: shoppingCartSlice,
        shopAddress: shoppingAddressSlice,
    },
});

export default store;