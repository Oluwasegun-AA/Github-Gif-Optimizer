import { combineReducers } from 'redux';
import uploadReducer from './uploadReducer';

// combines all reducers
const rootReducers = combineReducers({
  file: uploadReducer,
});

export default rootReducers;
