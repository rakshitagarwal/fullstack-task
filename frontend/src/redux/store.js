import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice.js";
import authSlice from "./authSlice.js";
import peopleSlice from './peopleSlice.js';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authSlice.reducer,
    people: peopleSlice
  },
});
