import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  selectedChat: {}
}

const chatSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    clearChat: (state) => {
      state.chat = []
    },
    loadChat: (state, action) => {
      const data = action.payload;
      state.data = data;
    },
    selectChat: (state, action) => {
        state.selectedChat = action.payload;
    }
  }
});

export const { clearChat, loadChat, selectChat } = chatSlice.actions;
export default chatSlice.reducer;