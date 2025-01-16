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

export const fetchCategories = () => {
  return axios.get(`${config.apiBaseUrl}/categories`, getAuthHeaders());
};

export const addCategory = (category) => {
  return axios.post(`${config.apiBaseUrl}/categories`, category, getAuthHeaders());
};

export const deleteCategory = (id) => {
  return axios.delete(`${config.apiBaseUrl}/categories/${id}`, getAuthHeaders());
};

export const updateCategory = (id, category) => {
  return axios.put(`${config.apiBaseUrl}/categories/${id}`, category, getAuthHeaders());
};

export const toggleCategoryStatus = (id) => {
  return axios.patch(`${config.apiBaseUrl}/categories/${id}/toggle-status`, {}, getAuthHeaders());
};
