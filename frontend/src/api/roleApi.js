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

export const fetchRoles = () => {
  return axios.get(`${config.apiBaseUrl}/roles`, getAuthHeaders());
};

export const fetchRoleById = (id) => {
  return axios.get(`${config.apiBaseUrl}/roles/${id}`, getAuthHeaders());
};

export const addRole = (role) => {
  return axios.post(`${config.apiBaseUrl}/roles`, role, getAuthHeaders());
};

export const updateRole = (id, role) => {
  return axios.patch(`${config.apiBaseUrl}/roles/${id}`, role, getAuthHeaders());
};

export const deleteRole = (id) => {
  return axios.delete(`${config.apiBaseUrl}/roles/${id}`, getAuthHeaders());
};
