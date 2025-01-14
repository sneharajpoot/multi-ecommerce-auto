import { combineReducers } from 'redux';
// ...existing code...
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
