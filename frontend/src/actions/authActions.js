import axios from 'axios';

export const login = (credentials) => async dispatch => {
  const response = await axios.post('/api/login', credentials);
  dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
};
