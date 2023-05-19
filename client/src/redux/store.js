import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import chatReducer from "./features/chatSlice";
import uiModeReducer from "./features/uiModeSlice";
import searchedUsersSlice from "./features/searchedUsersSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    ui: uiModeReducer,
    searchedUsers: searchedUsersSlice
  }
});