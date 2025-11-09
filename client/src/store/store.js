import { configureStore, createSlice } from '@reduxjs/toolkit';
import notificationSlice from './notificationSlice';

const appSlice = createSlice({
  name: 'app',
  initialState: { value: 0 },
  reducers: {},
});

// export const {} = appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    notificationCenter: notificationSlice,
  },
});

export default store;
