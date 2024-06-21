import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],

    total: localStorage.getItem("total")
      ? JSON.parse(localStorage.getItem("total"))
      : 0,
    totalItems: localStorage.getItem("totalItems")
      ? JSON.parse(localStorage.getItem("totalItems"))
      : 0,
  },

  reducers: {
    addToCart(state, action) {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        toast.error("Course Already in Cart");
        return;
      }

      state.cart.push(course);
      state.totalItems++;
      state.total += course.amount;
    },
    removeFromCart(state, action) {
      const data = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );

      state.cart.pop(data);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
