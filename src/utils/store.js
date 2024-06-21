import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";
import cartSlice from "./cartSlice";
import courseSlice from "./courseSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    cart: cartSlice,
    course : courseSlice
  },
});

export default store;
