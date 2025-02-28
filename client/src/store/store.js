import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/authSlice";

import adminProductsSlice from "./features/admin/productsSlice";
import adminOrdersSlice from "./features/admin/orderSlice";

import shoppingProductsSlice from "./features/shop/productsSlice";
import shoppingCartSlice from "./features/shop/cartSlice";
import shoppingAddressSlice from "./features/shop/addressSlice";
import shoppingOrderSlice from "./features/shop/orderSlice";
import shoppingSearchSlice from "./features/shop/searchSlice";
import shoppingReviewSlice from "./features/shop/reviewSlice";
import commonFeatureSlice from "./features/common/featureSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,

        adminProducts: adminProductsSlice,
        adminOrders: adminOrdersSlice,

        shopProducts: shoppingProductsSlice,
        shopCart: shoppingCartSlice,
        shopAddress: shoppingAddressSlice,
        shopOrder: shoppingOrderSlice,
        shopSearch: shoppingSearchSlice,
        shopReview: shoppingReviewSlice,

        commonFeature: commonFeatureSlice,
    },
});

export default store;
