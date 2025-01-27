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

export const createPayment = async (data) => {
    return axios.post(`${API_URL}/create-payment`, data, getAuthHeaders());
};

export const verifyPayment = async (data) => {
    return axios.post(`${API_URL}/verify-payment`, data, getAuthHeaders());
};

export const processRefund = async (data) => {
    return axios.post(`${API_URL}/process-refund`, data, getAuthHeaders());
};
