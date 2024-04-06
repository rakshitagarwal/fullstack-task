import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create action
export const createData = createAsyncThunk(
  "createData",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      const response = await axios.post("http://localhost:5000/api/v1", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// read action
export const showData = createAsyncThunk(
  "showData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// update action
export const updateData = createAsyncThunk(
  "updateData",
  async (data, { rejectWithValue }) => {
    console.log("updated data", data);
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// delete action
export const deleteData = createAsyncThunk(
  "deleteData",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/${id}`);
      return { id };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const excelSlice = createSlice({
  name: "excel",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createData.pending, (state) => {
        state.loading = true;
      })
      .addCase(createData.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(showData.pending, (state) => {
        state.loading = true;
      })
      .addCase(showData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(showData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (id) {
          state.data = state.data.filter((ele) => ele.id !== id);
        }
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(updateData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default excelSlice.reducer;
