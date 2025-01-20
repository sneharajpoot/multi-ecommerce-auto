import axios from 'axios';
import config from '../config'; // Import the config file

const getAuthHeaders = () => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
};

export const fetchProductTags = (productId) => {
    return axios.get(`${config.apiBaseUrl}/product-tags?productId=${productId}`, getAuthHeaders());
};

export const addProductTag = (tag) => {
    return axios.post(`${config.apiBaseUrl}/product-tags`, tag, getAuthHeaders());
};

export const updateProductTag = (id, tag) => {
    return axios.put(`${config.apiBaseUrl}/product-tags/${id}`, tag, getAuthHeaders());
};
// add delete api 
export const deleteProductTag = (id) => {
    return axios.delete(`${config.apiBaseUrl}/product-tags/${id}`, getAuthHeaders());
};
