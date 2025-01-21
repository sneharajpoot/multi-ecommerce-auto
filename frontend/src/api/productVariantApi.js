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

export const fetchProductVariants = (productId) => {
    return axios.get(`${config.apiBaseUrl}/product-variants?productId=${productId}`, getAuthHeaders());
};

export const addProductVariant = (product_id, variants) => {
    return axios.post(`${config.apiBaseUrl}/product-variants/${product_id}`, variants, getAuthHeaders());
};

export const updateProductVariant = (id, tag) => {
    return axios.put(`${config.apiBaseUrl}/product-variants/${id}`, tag, getAuthHeaders());
};
// add delete api 
export const deleteProductVariant = (id) => {
    return axios.delete(`${config.apiBaseUrl}/product-variants/${id}`, getAuthHeaders());
};
