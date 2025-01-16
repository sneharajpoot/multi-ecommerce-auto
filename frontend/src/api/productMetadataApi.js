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

export const addProductMetadata = (productId, metadata) => {
  return axios.post(`${config.apiBaseUrl}/product-metadata/${productId}`, metadata, getAuthHeaders());
};

export const getProductMetadata = (productId) => {
  return axios.get(`${config.apiBaseUrl}/product-metadata/${productId}`, getAuthHeaders());
};

export const updateProductMetadata = (productId, id, metadata) => {
  return axios.patch(`${config.apiBaseUrl}/product-metadata/${productId}/${id}`, metadata, getAuthHeaders());
};

export const deleteProductMetadata = (productId, id) => {
  return axios.delete(`${config.apiBaseUrl}/product-metadata/${productId}/${id}`, getAuthHeaders());
};
