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
            // action.payload contains the id of the message to be removed
            // from the notifications
        }
    }
});

export const { clearNotifications, loadNotifications, removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;