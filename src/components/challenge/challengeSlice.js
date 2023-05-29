import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'challenge',
  initialState: {
    currentChallenge: null,
    challengeList: [],
    status: 'error',
  },
  reducers: {
    currentChallengeChange: (state, action) => {
      // mutation || IMMER
      state.currentChallenge = action.payload;
    },
    challengeListChange: (state, action) => {
      state.challengeList = action.payload;
    },
  },
});