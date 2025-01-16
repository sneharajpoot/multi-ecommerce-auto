import axios from 'axios';
import config from '../config';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const fetchStores = async () => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/stores`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
};

export const addStore = async (store) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/stores`, store, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error adding store:', error);
    throw error;
  }
};

export const updateStore = async (store) => {
  try {
    const response = await axios.put(`${config.apiBaseUrl}/stores/${store.id}`, store, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error updating store:', error);
    throw error;
  }
};

export const toggleStoreStatus = async (storeId, isActive) => {
  try {
    const response = await axios.patch(`${config.apiBaseUrl}/stores/${storeId}/activate`, { active:isActive }, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error toggling store status:', error);
    throw error;
  }
};

export const activateStore = async (storeId) => {
  try {
    const response = await axios.patch(`${config.apiBaseUrl}/stores/${storeId}/activate`, {}, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error activating store:', error);
    throw error;
  }
};

export const approveStore = async (storeId, adminToken) => {
  try {
    const response = await axios.patch(`${config.apiBaseUrl}/stores/${storeId}/approve`, {}, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error approving store:', error);
    throw error;
  }
};
