import { combineReducers } from 'redux';
import examReducer from '../components/exam/examSlice';

const rootReducer = combineReducers({
  exam: examReducer,
});

export default rootReducer;