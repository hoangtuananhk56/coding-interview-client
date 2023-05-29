import { configureStore } from '@reduxjs/toolkit';
import examSlice from '../components/exam/examSlice';
import challengeSlice from '../components/challenge/challengeSlice';

const store = configureStore({
  reducer: {
    exam: examSlice.reducer,
    challenge: challengeSlice.reducer,
  },
});

export default store;