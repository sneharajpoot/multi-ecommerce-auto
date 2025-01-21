import axios from 'axios';
import config from '../config'; // Import the config file

// Function to register a customer
export const registerCustomer = (formData) => {
  return axios.post(`${config.apiBaseUrl}/auth/register-customer`, formData);
};

// Function to register a store
export const registerStore = (formData) => {
  return axios.post(`${config.apiBaseUrl}/auth/register-store`, formData);
};
