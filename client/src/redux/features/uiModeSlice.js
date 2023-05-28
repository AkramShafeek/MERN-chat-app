import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: 'light',
  theme: 'purple'
}

const uiModeSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode === 'light' ? state.mode = 'dark' : state.mode = 'light';
    },
    selectTheme: (state, action) => {
      state.theme = action.payload;
    }
  }
});

export const { toggleMode, selectTheme } = uiModeSlice.actions;
export default uiModeSlice.reducer;