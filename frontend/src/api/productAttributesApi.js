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

export const addProductAttributes = (productId, attributes) => {
  return axios.post(`${config.apiBaseUrl}/product-attributes/${productId}`, attributes, getAuthHeaders());
};

export const getProductAttributes = (productId) => {
  return axios.get(`${config.apiBaseUrl}/product-attributes/${productId}`, getAuthHeaders());
};

export const updateProductAttributes = (productId,   attributes) => {
  return axios.patch(`${config.apiBaseUrl}/product-attributes/${productId}`, attributes, getAuthHeaders());
};

export const deleteProductAttributes = (productId,id) => {
  return axios.delete(`${config.apiBaseUrl}/product-attributes/${productId}/${id}`, getAuthHeaders());
};
