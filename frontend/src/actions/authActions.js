import { loginApi, signupApi, decryptTokenApi } from '../api/authApi';
import { syncCart } from '../api/cartApi'; // Import the syncCart function

export const login = (credentials) => async dispatch => {
  try {
    const response = await loginApi(credentials);
    const token = response.data.token;
    localStorage.setItem('token', token);

    // Decrypt the token to get user data
    const decryptedTokenResponse = await decryptTokenApi(token);
    const userData = decryptedTokenResponse.data;
    const datau = { ...response.data, user: userData, token };

    dispatch({ type: 'LOGIN_SUCCESS', payload: datau });

    // Check the role and redirect accordingly
    const userRole = userData.role;
    if (userRole === 'store_admin' || userRole === 'admin') {
      // window.location.href = '/dashboard';
    } else {
      // Sync cart if it exists in local storage
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        await syncCart(JSON.parse(localCart));
      } 
    }
  } catch (error) {
    console.error( error.response?.data?.message || 'Login failed');
    // dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response?.data?.message || 'Login failed' });
  }
};

export const decryptToken = (token) => async dispatch => {
  try {
    const response = await decryptTokenApi(token);
    dispatch({ type: 'DECRYPT_TOKEN_SUCCESS', payload: response.data });
  } catch (error) {
    console.error(error.response?.data?.message || 'Token decryption failed');
    dispatch({ type: 'DECRYPT_TOKEN_FAILURE', payload: error.message });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userId');
  dispatch({ type: 'LOGOUT' });
};

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAIL = 'REGISTER_FAIL';

export const signup = (credentials) => async (dispatch) => {
  try {
    const response = await signupApi(credentials);
    if (response.data.result) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
      
      // Redirect to login page
      window.location.href = '/login';
    } else {
      dispatch({
        type: REGISTER_FAIL,
        payload: response.data.message,
      });
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Signup failed';
    console.error(errorMessage);
    dispatch({
      type: REGISTER_FAIL,
      payload: errorMessage,
    });
    throw new Error(errorMessage); // Ensure the error is thrown
  }
};
