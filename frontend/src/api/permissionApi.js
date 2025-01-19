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

export const fetchPermissions = () => {
  return axios.get(`${config.apiBaseUrl}/permissions`, getAuthHeaders());
};

export const fetchPermissionById = (id) => {
  return axios.get(`${config.apiBaseUrl}/permissions/${id}`, getAuthHeaders());
};

export const addPermission = (permission) => {
  return axios.post(`${config.apiBaseUrl}/permissions`, permission, getAuthHeaders());
};

export const updatePermission = (id, permission) => {
  return axios.patch(`${config.apiBaseUrl}/permissions/${id}`, permission, getAuthHeaders());
};

export const deletePermission = (id) => {
  return axios.delete(`${config.apiBaseUrl}/permissions/${id}`, getAuthHeaders());
};
