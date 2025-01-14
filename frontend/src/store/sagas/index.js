import { all } from 'redux-saga/effects';
// ...existing code...
import authSaga from "./authSaga";

export default function* rootSaga() {
  yield all([authSaga()]);
}
 