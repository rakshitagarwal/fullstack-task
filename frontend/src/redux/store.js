import { configureStore } from "@reduxjs/toolkit";
import excelReducer from "./excelSlice";

export const store = configureStore({
  reducer: {
    excel: excelReducer,
  },
});
