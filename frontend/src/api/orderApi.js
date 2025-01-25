import axios from 'axios';
import config from '../config';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const placeOrder = async (orderData) => {
  return await axios.post(`${config.apiBaseUrl}/orders`, orderData, getAuthHeaders());
};

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/orders/list`, getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const fetchOrderDetail = async (orderId) => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/orders/detail/${orderId}`, getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};
