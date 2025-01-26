import axios from 'axios';
import config from '../config';

export const subscribeNewsletter = (email) => {
  return axios.post(`${config.apiBaseUrl}/newsletter/subscribe`, { email });
};
