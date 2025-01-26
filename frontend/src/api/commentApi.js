import axios from 'axios';
import config from '../config'; // Assuming config contains the base API URL

const apiBaseUrl = config.apiBaseUrl;

export const fetchCommentsByReview = async (productId) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/comments/product/${productId}/comments`);
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

export const addComment = async (productId, body) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/comments/product/${productId}/comments`, body);
        return response.data;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};
