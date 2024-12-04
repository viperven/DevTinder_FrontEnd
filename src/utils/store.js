import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import themeReducer from "./themeSlice";
import requestReducer from "./requestSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    theme: themeReducer,
    request: requestReducer,
  },
});
