import { configureStore } from '@reduxjs/toolkit';
import examSlice from '../components/exam/examSlice';

const store = configureStore({
  reducer: {
    exam: examSlice.reducer,
  },
});

export default store;