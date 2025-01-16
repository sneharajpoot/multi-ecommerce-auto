import axios from 'axios';
import config from '../config';
import { toast } from 'react-toastify';

export const fetchStores = () => async dispatch => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/stores`);
    dispatch({ type: 'FETCH_STORES', payload: response.data });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - please log in.');
    } else {
      console.error(error.message);
    }
  }
};

export const addStore = (storeData) => async dispatch => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/stores`, storeData);
    dispatch({ type: 'ADD_STORE', payload: response.data });
    toast.success('Store added successfully!');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - please log in.');
    } else {
      console.error(error.message);
    }
    toast.error('Failed to add store.');
  }
};

export const updateStore = (id, storeData) => async dispatch => {
  try {
    const response = await axios.put(`${config.apiBaseUrl}/stores/${id}`, storeData);
    dispatch({ type: 'UPDATE_STORE', payload: response.data });
    toast.success('Store updated successfully!');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - please log in.');
    } else {
      console.error(error.message);
    }
    toast.error('Failed to update store.');
  }
};

export const toggleStoreStatus = (storeId, isActive) => async dispatch => {
  try {
    const response = await axios.patch(`${config.apiBaseUrl}/stores/${storeId}/status`, { isActive });
    dispatch({ type: 'TOGGLE_STORE_STATUS', payload: response.data });
    toast.success('Store status updated successfully!');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - please log in.');
    } else {
      console.error(error.message);
    }
    toast.error('Failed to update store status.');
  }
};

export const addStoreByAdmin = (storeData, adminToken) => async dispatch => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/admin/stores`, storeData, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    });
    dispatch({ type: 'ADD_STORE_BY_ADMIN', payload: response.data });
    toast.success('Store added by admin successfully!');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - please log in.');
    } else {
      console.error(error.message);
    }
    toast.error('Failed to add store by admin.');
  }
};

export const activateStore = (storeId) => async dispatch => {
  try {
    const response = await axios.patch(`${config.apiBaseUrl}/stores/${storeId}/activate`);
    dispatch({ type: 'ACTIVATE_STORE', payload: response.data });
    toast.success('Store activated successfully!');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - please log in.');
    } else {
      console.error(error.message);
    }
    toast.error('Failed to activate store.');
  }
};

export const approveStore = (storeId, adminToken) => async dispatch => {
  try {
    const response = await axios.patch(`${config.apiBaseUrl}/stores/${storeId}/approve`, {}, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    });
    dispatch({ type: 'APPROVE_STORE', payload: response.data });
    toast.success('Store approved successfully!');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - please log in.');
    } else {
      console.error(error.message);
    }
    toast.error('Failed to approve store.');
  }
};
