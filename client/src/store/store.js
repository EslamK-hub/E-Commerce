import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import adminProductsSlice from "./features/admin/productsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
    },
});

export default store;