import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import authReducer from "./slices/authSlice";
import orderReducer from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    orders: orderReducer,
  },
});

export default store;