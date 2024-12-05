import { createSlice } from "@reduxjs/toolkit";

export const connectionSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    storeConnection: (state, action) => {
      state.push(...action.payload);
    }
  },
});

export const { storeConnection } = connectionSlice.actions;

export default connectionSlice.reducer;
