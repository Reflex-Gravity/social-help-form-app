import { configureStore, createSlice } from '@reduxjs/toolkit';
import notificationSlice from './notificationSlice';

const lang = localStorage.getItem('lang') || 'en';

const appSlice = createSlice({
  name: 'app',
  initialState: { lang },
  reducers: {
    setLang: (state) => {
      const next = state.lang === 'en' ? 'ar' : 'en';
      state.lang = next;
      localStorage.setItem('lang', next);
    },
  },
});

export const { setLang } = appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    notificationCenter: notificationSlice,
  },
});

export default store;
