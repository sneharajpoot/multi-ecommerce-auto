import { combineReducers } from 'redux';
import authReducer from './authReducer';
import storeReducer from './storeReducer';
// ...existing code...

export default combineReducers({
  auth: authReducer,
  store: storeReducer,
  // ...existing code...
});
