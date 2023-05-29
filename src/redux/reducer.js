import { combineReducers } from 'redux';
import examReducer from '../components/exam/examSlice';
import challengeReducer from '../components/challenge/challengeSlice';

const rootReducer = combineReducers({
  exam: examReducer,
  challenge: challengeReducer
});

export default rootReducer;