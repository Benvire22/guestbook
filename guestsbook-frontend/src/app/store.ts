import { configureStore } from '@reduxjs/toolkit';
import { guestbookReducer } from '../features/guestbook/guestbookSlice';

export const store = configureStore({
  reducer: {
    guestbook: guestbookReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;