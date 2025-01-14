import axios from 'axios';

export const fetchStores = () => async dispatch => {
  const response = await axios.get('/api/stores');
  dispatch({ type: 'FETCH_STORES', payload: response.data });
};

export const addStore = (storeData) => async dispatch => {
  const response = await axios.post('/api/stores', storeData);
  dispatch({ type: 'ADD_STORE', payload: response.data });
};

export const updateStore = (id, storeData) => async dispatch => {
  const response = await axios.put(`/api/stores/${id}`, storeData);
  dispatch({ type: 'UPDATE_STORE', payload: response.data });
};

export const addStoreByAdmin = (storeData, adminToken) => async dispatch => {
  const response = await axios.post('/api/admin/stores', storeData, {
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  });
  dispatch({ type: 'ADD_STORE_BY_ADMIN', payload: response.data });
};
