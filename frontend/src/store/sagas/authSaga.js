import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects'; // Add this line
import { loginSuccess } from "../actions/authActions";
import { login } from "../../services/authService";

function* handleLogin(action) {
  try {
    const { email, password } = action.payload;
    const { token, role } = yield call(login, email, password);
    yield put(loginSuccess(token, role));
  } catch (error) {
    console.error("Login failed", error);
  }
}

function* authSaga() {
  yield takeLatest("LOGIN_REQUEST", handleLogin);
}

export default authSaga;
