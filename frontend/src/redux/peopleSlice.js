import { createSlice } from "@reduxjs/toolkit";
import usersData from "./data";

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    people: [...usersData],
    status: "idle",
    error: null,
  },
  reducers: {
    deletePerson: (state, action) => {
      const idToDelete = action.payload;
      state.people = state.people.filter((person) => person.id !== idToDelete);
    },
  },
});

export const { deletePerson } = peopleSlice.actions;
export default peopleSlice.reducer