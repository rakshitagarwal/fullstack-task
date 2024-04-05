import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
    isLoggedIn: !localStorage.getItem("isLoggedIn"),
  },
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("isLoggedIn", true);
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const login = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("http://192.168.29.251:7000/login", userData);
    if (response.data.status === 200) {
      dispatch(loginSuccess(response.data.data));
      return response.data;
    } else return response.data;
  } catch (error) {
    dispatch(logout());
    return toast.error(`${error.message}`, { autoClose: 500 });
  }
};

export const signup = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("http://192.168.29.251:7000/register", userData);
    if (response.data.status !== 201) return toast.error(`${response.message}`, { autoClose: 500 });
    return response.data;
  } catch (error) {
    dispatch(logout());
    return toast.error("Invalid data for signup", { autoClose: 500 });
  }
};

export const authActions = authSlice.actions;
export default authSlice;
