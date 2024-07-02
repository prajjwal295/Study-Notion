import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";
import cartSlice from "./cartSlice";
import courseSlice from "./courseSlice";
import viewCourseSlice from "./viewCourseSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    cart: cartSlice,
    course: courseSlice,
    viewCourse: viewCourseSlice,
  },
});

export default store;
