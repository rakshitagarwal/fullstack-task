import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ENDPOINT from "../utils/endpoints";

// Initial state for the Excel slice of the Redux store
const initialState = {
  data: [], // Array to store Excel data
  loading: false, // Indicates if data is being fetched or modified
  error: null, // Stores any error that occurs during async operations
};

// Async thunk action to create data
export const createData = createAsyncThunk(
  "createData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(ENDPOINT + `/`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk action to insert a row
export const insertRow = createAsyncThunk(
  "insertRow",
  async (toInsert, { rejectWithValue }) => {
    try {
      const response = await axios.post(ENDPOINT + `/add`, toInsert);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk action to update data
export const updateData = createAsyncThunk(
  "updateData",
  async (toEdit, { rejectWithValue }) => {
    try {
      const { index, ...data } = toEdit;
      const response = await axios.put(ENDPOINT + `/${index}`, { data });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk action to delete data
export const deleteData = createAsyncThunk(
  "deleteData",
  async (toDelete, { rejectWithValue }) => {
    try {
      const { index, ...data } = toDelete;
      const response = await axios.delete(ENDPOINT + `/${index}`, { data });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create Excel slice using createSlice
export const excelSlice = createSlice({
  name: "excel", // Name of the slice
  initialState: initialState, // Initial state
  reducers: {}, // No additional reducers needed

  // Define extra reducers to handle async action lifecycle
  extraReducers: (builder) => {
    builder
      // Handling successful fulfillment of createData
      .addCase(createData.fulfilled, (state, action) => {
        state.loading = false; 
        state.data = state.data.length // If data already exists, add new data to the array, else create a new array
          ? [...state.data, action.payload]
          : [action.payload];
      })
      // Handling successful fulfillment of insertRow
      .addCase(insertRow.fulfilled, (state, action) => {
        state.loading = false; 
        let temp = state.data; // Create a temporary copy of data
        // Update the corresponding row in temp with the new data
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].id === action.payload.id) {
            temp[i] = action.payload;
          }
        }
        state.data = temp; // Update data with the modified temp array
      })
      // Handling successful fulfillment of updateData
      .addCase(updateData.fulfilled, (state, action) => {
        state.loading = false; 
        let temp = state.data; // Create a temporary copy of data
        // Update the corresponding row in temp with the new data
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].id === action.payload.id) {
            temp[i] = action.payload;
          }
        }
        state.data = temp; // Update data with the modified temp array
      })
      // Handling successful fulfillment of deleteData
      .addCase(deleteData.fulfilled, (state, action) => {
        state.loading = false; 
        let temp = state.data; // Create a temporary copy of data
        // Update the corresponding row in temp with the new data
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].id === action.payload.id) {
            temp[i] = action.payload;
          }
        }
        state.data = temp; // Update data with the modified temp array
      })
      // Handling pending and rejected actions
      .addMatcher(
        // Set loading to true for pending and rejected actions
        (action) =>
          action.type.endsWith("/pending") || action.type.endsWith("/rejected"),
        (state) => {
          state.loading = true;
        }
      )
      // Reset error to null upon successful fulfillment of an action
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.error = null;
        }
      )
      // Set error and loading status upon rejected action
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload.message; // Set error message
        }
      );
  },
});

export default excelSlice.reducer; // Export the reducer
