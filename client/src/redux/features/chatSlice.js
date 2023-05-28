import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  selectedChat: null,
}

const chatSlice = createSlice({
  name: 'chatData',
  initialState,
  reducers: {
    clearChat: (state) => {
      state.data = [];
      state.selectedChat = null;
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