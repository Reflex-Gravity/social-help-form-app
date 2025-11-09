import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notificationCenter',
  initialState: {
    notifications: [],
  },
  reducers: {
    showNotification: (state, action) => {
      state.notifications.push({
        id: Date.now() + Math.random(),
        message: action.payload.message,
        severity: action.payload.severity || 'info',
        duration: action.payload.duration || 3000,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { showNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
