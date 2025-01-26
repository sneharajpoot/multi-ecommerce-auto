import axios from 'axios';
import config from '../config'; // Assuming config contains the base API URL

const apiBaseUrl = config.apiBaseUrl;

export const fetchReviewsByProduct = async (productId, filter) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/reviews/product/${productId}/reviews?page=${filter.page}&limit=${filter.limit}&user_id=${filter.user_id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

export const addReview = async (productId, body) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/reviews/product/${productId}/reviews`, body);
        return response.data;
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
};
