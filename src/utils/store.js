import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import themeReducer from "./themeSlice";
import requestReducer from "./requestSlice";
import connectionReducer from "./connectionSlice";
import ignoreSliceReducer from "./ignoreSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    theme: themeReducer,
    request: requestReducer,
    connection: connectionReducer,
    ignore: ignoreSliceReducer,
  },
});
