import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (pageNumber) => {
    const response = await fetch(`https://swapi.dev/api/people/?page=${pageNumber}`);
    if (response.status === 200) {
      const data = await response.json();
      const fetchData = {
        count: data.count,
        results: data.results
      }
      return fetchData;
    } else {
      return null;
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
