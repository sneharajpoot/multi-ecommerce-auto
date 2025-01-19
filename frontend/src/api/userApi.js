import axios from 'axios';
import config from '../config'; // Import the config file

const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const fetchUsers = (page = 1) => {
  return axios.get(`${config.apiBaseUrl}/users`, { params: { page }, ...getAuthHeaders() });
};

export const fetchUserById = (id) => {
  return axios.get(`${config.apiBaseUrl}/users/${id}`, getAuthHeaders());
};

export const addUser = (user) => {
  return axios.post(`${config.apiBaseUrl}/users`, user, getAuthHeaders());
};

export const updateUser = (id, user) => {
  return axios.patch(`${config.apiBaseUrl}/users/${id}`, user, getAuthHeaders());
};

export const deleteUser = (id) => {
  return axios.delete(`${config.apiBaseUrl}/users/${id}`, getAuthHeaders());
};

export const updateUserStatus = (id, status) => {
  return axios.patch(`${config.apiBaseUrl}/users/${id}/status`, { status }, getAuthHeaders());
};
