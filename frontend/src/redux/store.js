import { configureStore } from "@reduxjs/toolkit";
import excelReducer from "./excelSlice";

// Configure Redux store with the provided reducer
export const store = configureStore({
  reducer: {
    excel: excelReducer, // Using excelReducer for managing state related to Excel functionality
  },
});
