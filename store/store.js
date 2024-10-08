import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './ChatSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;
