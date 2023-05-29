import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'exam',
  initialState: {
    currentExam: null,
    examList: [],
    status: 'error',
  },
  reducers: {
    currentExamChange: (state, action) => {
      // mutation || IMMER
      state.currentExam = action.payload;
    },
    examListChange: (state, action) => {
      console.log(action.payload, "payload");
      state.examList = action.payload;
    },
  },
});