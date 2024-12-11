import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import ThemeSlice from "../utils/themeSlice";
import requestReducer from "./requestSlice";
import connectionReducer from "./connectionSlice";
import ignoreSliceReducer from "./ignoreSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    theme: ThemeSlice,
    request: requestReducer,
    connection: connectionReducer,
    ignore: ignoreSliceReducer,
  },
});
