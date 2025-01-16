import axios from 'axios';
import config from '../config';

export const login = (credentials) => async dispatch => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/auth/login`, credentials);
    const token = response.data.token;
    localStorage.setItem('token', token);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    console.error(error.response?.data?.message || 'Login failed');
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  }
};

export const decryptToken = (token) => async dispatch => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/auth/decrypt-token`, { token });
    dispatch({ type: 'DECRYPT_TOKEN_SUCCESS', payload: response.data });
  } catch (error) {
    console.error(error.response?.data?.message || 'Token decryption failed');
    dispatch({ type: 'DECRYPT_TOKEN_FAILURE', payload: error.message });
  }
};

export const loadUser = () => async dispatch => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/auth/user`);
    dispatch({ type: 'LOAD_USER_SUCCESS', payload: response.data });
  } catch (error) {
    console.error(error.response?.data?.message || 'Failed to load user');
    dispatch({ type: 'LOAD_USER_FAILURE', payload: error.message });
  }
};
