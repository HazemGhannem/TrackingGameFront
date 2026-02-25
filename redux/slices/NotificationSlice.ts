import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification, NotificationState } from './types';




const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<Omit<Notification, 'id'>>,
    ) => {
      const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      state.notifications.push({ id, duration: 4000, ...action.payload });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload,
      );
    },
    clearAll: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, removeNotification, clearAll } =
  notificationSlice.actions;

export default notificationSlice.reducer;
