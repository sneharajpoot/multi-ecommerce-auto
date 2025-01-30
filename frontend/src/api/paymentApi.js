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

const API_URL = config.apiBaseUrl + '/payment';

export const getPaymentGateways = async () => {
    return axios.get(`${API_URL}/gateways`,getAuthHeaders());
};

export const createPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/payments`, paymentData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

export const verifyPayment = async (data) => {
    return axios.post(`${API_URL}/verify-payment`, data, getAuthHeaders());
};

export const processRefund = async (data) => {
    return axios.post(`${API_URL}/process-refund`, data, getAuthHeaders());
};
