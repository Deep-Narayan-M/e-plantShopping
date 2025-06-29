import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";

// Create a Redux store using configureStore from Redux Toolkit
const store = configureStore({
  // Define the root reducer object
  reducer: {
    // 'cart' is the name of the slice in the store, and it's managed by cartReducer
    cart: cartReducer,
  },
  // Enable Redux DevTools Extension for better debugging
  devTools: process.env.NODE_ENV !== "production",
});

export default store; // Export the store for use in the app (e.g., in <Provider store={store}>)
