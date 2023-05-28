import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userInfo: null
}

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    clearUserInfo: (state) => {
      state.userInfo = null;
      state.token = null;
    },
    userLogin: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.userInfo = user;
    }
  }
});

export const { clearUserInfo, userLogin } = userSlice.actions;
export default userSlice.reducer;