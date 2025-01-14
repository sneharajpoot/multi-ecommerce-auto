import axios from 'axios';
import { toast } from 'react-toastify';
import config from './config';

const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl
  // ...existing configuration (headers, etc.)...
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Request made and server responded
      toast.error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      // The request was made but no response was received
      toast.error('Error: No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      toast.error(`Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
