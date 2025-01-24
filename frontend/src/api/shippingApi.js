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

export const getShippingAddressHistory = async (customerId) => {
  return await axios.get(`${config.apiBaseUrl}/shipping-address-histories/${customerId}`, getAuthHeaders());
};

export const fetchShippingAddressHistory = async (customerId, address) => {
  return await axios.post(`${config.apiBaseUrl}/shipping-address-histories/${customerId}`, address, getAuthHeaders());
};

export const addShippingAddress = async (customerId, address) => {
  return await axios.post(`${config.apiBaseUrl}/shipping-addresses/${customerId}`, address, getAuthHeaders());
};

export const fetchShippingAddress = async (customerId) => {
  return await axios.get(`${config.apiBaseUrl}/shipping-addresses/${customerId}`, getAuthHeaders());
};

export const updateShippingAddress = async (addressId, address) => {
  return await axios.put(`${config.apiBaseUrl}/shipping-addresses/${addressId}`, address, getAuthHeaders());
};

export const deleteShippingAddress = async (addressId) => {
  return await axios.delete(`${config.apiBaseUrl}/shipping-addresses/${addressId}`, getAuthHeaders());
};
