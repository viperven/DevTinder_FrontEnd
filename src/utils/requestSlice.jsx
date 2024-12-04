import { createSlice } from "@reduxjs/toolkit";

export const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    storeRequest: (state, action) => {
      state.push(...action.payload);
    },
    removeRequest: (state, action) => {
      return state.filter((curElm) => curElm._id !== action.payload);
    },
  },
});

export const { storeRequest, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
