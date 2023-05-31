import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messageNotifications: []
}

const notificationsSlice = createSlice({
    name: 'messageNotifications',
    initialState,
    reducers: {
        clearNotifications: (state) => {
            state.messageNotifications = []
        },
        loadNotifications: (state, action) => {
            state.messageNotifications = action.payload;
        },
        removeNotification: (state, action) => {
            // action.payload contains the id of the chat to be removed from the notifications
            const filteredNotifications = state.messageNotifications.filter(message => message.chat._id !== action.payload);
            state.messageNotifications = filteredNotifications;
        }
    }
});

export const { clearNotifications, loadNotifications, removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;