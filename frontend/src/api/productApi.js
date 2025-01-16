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

export const fetchProducts = () => {
  return axios.get(`${config.apiBaseUrl}/products`, getAuthHeaders());
};

export const addProduct = (product) => {
  return axios.post(`${config.apiBaseUrl}/products`, product, getAuthHeaders());
};

export const updateProduct = (id, product) => {
  return axios.patch(`${config.apiBaseUrl}/products/${id}`, product, getAuthHeaders());
};

export const deleteProduct = (id) => {
  return axios.delete(`${config.apiBaseUrl}/products/${id}`, getAuthHeaders());
};
