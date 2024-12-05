import { createSlice } from "@reduxjs/toolkit";

export const ignoreSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    storeIgnoreList: (state, action) => {
      state.push(...action.payload);
    }
  },
});

export const { storeIgnoreList } = ignoreSlice.actions;

export default ignoreSlice.reducer;
