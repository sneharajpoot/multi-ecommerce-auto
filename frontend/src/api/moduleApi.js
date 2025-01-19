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

export const fetchModules = () => {
  return axios.get(`${config.apiBaseUrl}/modules`, getAuthHeaders());
};

export const fetchModuleById = (id) => {
  return axios.get(`${config.apiBaseUrl}/modules/${id}`, getAuthHeaders());
};

export const addModule = (module) => {
  return axios.post(`${config.apiBaseUrl}/modules`, module, getAuthHeaders());
};

export const updateModule = (id, module) => {
  return axios.patch(`${config.apiBaseUrl}/modules/${id}`, module, getAuthHeaders());
};

export const deleteModule = (id) => {
  return axios.delete(`${config.apiBaseUrl}/modules/${id}`, getAuthHeaders());
};
