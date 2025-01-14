import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the base URL as needed
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
