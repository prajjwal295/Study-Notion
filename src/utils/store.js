import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    cart: authSlice,
    profile: profileSlice,
    cart: cartSlice,
  },
});

export default store;
