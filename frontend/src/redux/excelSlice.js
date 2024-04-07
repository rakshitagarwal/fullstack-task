import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
}

// create action
export const createData = createAsyncThunk(
  "createData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1", data);
      console.log("create data in slice", response.data);
      return  response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// insert action
export const insertRow = createAsyncThunk(
  "insertRow",
  async (toInsert, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/add", toInsert);
      console.log("insert data in slice",response.data);
      return  response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// read action
export const readData = createAsyncThunk(
  "readData",
  async (toView, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1", {toView});
      console.log("read data in slice",response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// update action
export const updateData = createAsyncThunk(
  "updateData",
  async (toEdit, { rejectWithValue }) => {
    try {
      const {index , ...data} = toEdit;
      const response = await axios.put(`http://localhost:5000/api/v1/${index}`, {data});
      console.log("update data in slice",response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// delete action
export const deleteData = createAsyncThunk(
  "deleteData",
  async (toDelete, { rejectWithValue }) => {
    try {
      const {index , ...data} = toDelete;
      const response = await axios.delete(`http://localhost:5000/api/v1/${index}`, { data });
      console.log("delete data in slice",response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const excelSlice = createSlice({
  name: "excel",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.length ? [...state.data, action.payload] : [action.payload]; 
      })
      .addCase(insertRow.fulfilled, (state, action) => {
        state.loading = false;
        let temp = state.data;
        for (let i = 0; i < temp.length; i++){
          if (temp[i].id === action.payload.id){
            temp[i] = action.payload;
          }
        }
        state.data = temp; 
      })
      .addCase(readData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.loading = false;
        let temp = state.data;
        for (let i = 0; i < temp.length; i++){
          if (temp[i].id === action.payload.id){
            temp[i] = action.payload;
          }
        }
        state.data = temp; 
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.loading = false;
        let temp = state.data;
        for (let i = 0; i < temp.length; i++){
          if (temp[i].id === action.payload.id){
            temp[i] = action.payload;
          }
        }
        state.data = temp; 
      })
      .addMatcher(
        (action) =>
          action.type.endsWith("/pending") || action.type.endsWith("/rejected"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        }
      );
  },
});

export default excelSlice.reducer;
