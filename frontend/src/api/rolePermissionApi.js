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

export const fetchRolePermissions = (roleId) => {
  return axios.get(`${config.apiBaseUrl}/role-permissions?roleId=${roleId}`, getAuthHeaders());
};

export const fetchRolePermissionById = (id) => {
  return axios.get(`${config.apiBaseUrl}/role-permissions/${id}`, getAuthHeaders());
};

export const addRolePermission = (rolePermission) => {
  return axios.post(`${config.apiBaseUrl}/role-permissions`, rolePermission, getAuthHeaders());
};

export const updateRolePermission = (roleid, rolePermission) => {
  return axios.patch(`${config.apiBaseUrl}/role-permissions/${roleid}`, rolePermission, getAuthHeaders());
};

export const deleteRolePermission = (id) => {
  return axios.delete(`${config.apiBaseUrl}/role-permissions/${id}`, getAuthHeaders());
};
