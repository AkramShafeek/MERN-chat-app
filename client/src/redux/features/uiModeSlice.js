import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: 'light'
}

const uiModeSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    toggleMode: (state) => {
        state.theme === 'light' ? state.theme = 'dark' : state.theme = 'light';
    }
  }
});

export const { toggleMode } = uiModeSlice.actions;
export default uiModeSlice.reducer;