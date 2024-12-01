import { createSlice } from "@reduxjs/toolkit";

export const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    storeFeed: (state, action) => {
      state.push(...action.payload);
    },
    removeFeed: (state, action) => {
      return state.filter((curElm) => curElm._id !== action.payload);
    },
  },
});

export const { storeFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
