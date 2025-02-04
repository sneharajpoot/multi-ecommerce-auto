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

export const fetchProducts = (page, store_id, category_id) => {
  const params = {
    page,
    store_id,
    category_id
  };
  return axios.get(`${config.apiBaseUrl}/products`, { params, ...getAuthHeaders() });
};

export const searchProducts = (params) => { 
  return axios.post(`${config.apiBaseUrl}/products/search`, params, { ...getAuthHeaders() });
};

export const brandList = ( ) => { 
  return axios.get(`${config.apiBaseUrl}/products/brand/list`,  { ...getAuthHeaders() });
};

export const fetchProductById = (id) => {
  console.log('fetchProductById', id);
  return axios.get(`${config.apiBaseUrl}/products/${id}`, getAuthHeaders());
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

export const fetchNewArrivals = async () => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/products/new-arrivals`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    throw error;
  }
};

export const fetchBestSellers = async () => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/products/best-sellers`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching best sellers:', error);
    throw error;
  }
};

export const fetchOnSale = async () => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/products/on-sale`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching on sale products:', error);
    throw error;
  }
};
