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
  let response = await axios.post(`${config.apiBaseUrl}/orders`, orderData, getAuthHeaders());
  return response.data;
};

export const fetchOrders = async (page = 1) => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/orders/list?page=${page}`, getAuthHeaders());
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

export const fetchCompleteOrderDetail = async (orderId) => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/orders/complete/detail/${orderId}`, getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};

export const fetchCompleteOrders = async (page = 1, storeId = 0) => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/orders/lists?page=${page}&storeId=${storeId}`, getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const updateOrdersStatus = async (order_id, body) => {
  try {
    const response = await axios.patch(`${config.apiBaseUrl}/orders-status/status/${order_id}`,body, getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const cancelOrdersStatus = async (order_id) => {
  try {
    const response = await axios.patch(`${config.apiBaseUrl}/orders-status/cancel/${order_id}`,{}, getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error cancel orders:', error.response.data);
    throw error.response.data;
  }
};


export const getStatusList = async ( ) => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/orders-status/statuses`, getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getStatusHistory = async ( order_id) => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/orders-status/history/${order_id}`, getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const addOrUpdateStatusHistory = async (order_id, body) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/orders-status/history/${order_id}`, body, getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error adding/updating status history:', error);
    throw error;
  }
};