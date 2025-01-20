import axios from 'axios';
import config from '../config'; // Import the config file

const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data' // Set the content type for file upload
    }
  };
};

export const uploadProductImage = (productId, formData) => {
  return axios.post(`${config.apiBaseUrl}/product-images/${productId}`, formData, getAuthHeaders());
};

export const deleteProductImage = (productId, imageId) => {
  return axios.delete(`${config.apiBaseUrl}/product-images/${productId}/${imageId}`, getAuthHeaders());
};

export const setPrimaryImage = (productId, imageId) => {
  return axios.patch(`${config.apiBaseUrl}/product-images/setprimary/${productId}/${imageId}`, {}, getAuthHeaders());
};
