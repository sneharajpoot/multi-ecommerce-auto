import axios from 'axios';
import config from '../config'; // Import the config file
import { jwtDecode } from 'jwt-decode'; // Correct the import statement

// Function to register a customer
export const registerCustomer = (formData) => {
  return axios.post(`${config.apiBaseUrl}/auth/register-customer`, formData);
};

// Function to register a store
export const registerStore = (formData) => {
  return axios.post(`${config.apiBaseUrl}/auth/register-store`, formData);
};

export const loginApi = (credentials) => {
  return axios.post(`${config.apiBaseUrl}/auth/login`, credentials);
};

export const signupApi = (credentials) => {
  return axios.post(`${config.apiBaseUrl}/auth/register-customer`, credentials);
};

export const decryptTokenApi = (token) => {
  // Decrypt token locally
  try {
    const decodedToken = jwtDecode(token);
    return { data: decodedToken };
  } catch (error) {
    throw new Error('Token decryption failed');
  }
};

export const loadUserApi = () => {
  return axios.get(`${config.apiBaseUrl}/auth/user`);
};
