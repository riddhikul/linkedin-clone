import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/counter/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools extension
});
