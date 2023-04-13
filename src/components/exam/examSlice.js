import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'exam',
  initialState: {
    currentExam: null,
    examList: [1, 2],
    status: 'error',
  },
  reducers: {
    currentExamChange: (state, action) => {
      // mutation || IMMER
      state.currentExam = action.payload;
    },
    examListChange: (state, action) => {
      state.examList = action.payload;
    },
  },
});