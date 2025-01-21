import axios from 'axios';
import config from '../config'; // Import the config file

export const registerCustomer = (formData) => {
  return axios.post(`${config.apiBaseUrl}/auth/register-customer`, formData);
};

export const registerStore = (formData) => {
  return axios.post(`${config.apiBaseUrl}/auth/register-store`, formData); // Add registerStore API function
};
