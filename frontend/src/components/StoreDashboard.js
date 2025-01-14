import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStore, fetchStores, updateStore } from '../actions/storeActions';

const StoreDashboard = () => {
  const dispatch = useDispatch();
  const stores = useSelector(state => state.store.stores);
  const [storeData, setStoreData] = useState({ name: '', location: '' });
  const [editingStore, setEditingStore] = useState(null);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  const handleChange = (e) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStore) {
      dispatch(updateStore(editingStore.id, storeData));
    } else {
      dispatch(addStore(storeData));
    }
    setStoreData({ name: '', location: '' });
    setEditingStore(null);
  };

  const handleEdit = (store) => {
    setStoreData(store);
    setEditingStore(store);
  };

  return (
    <div className="store-dashboard">
      <h2>Store Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={storeData.name}
          onChange={handleChange}
          placeholder="Store Name"
          required
        />
        <input
          type="text"
          name="location"
          value={storeData.location}
          onChange={handleChange}
          placeholder="Store Location"
          required
        />
        <button type="submit">{editingStore ? 'Update Store' : 'Add Store'}</button>
      </form>
      <ul>
        {stores.map(store => (
          <li key={store.id}>
            {store.name} - {store.location}
            <button onClick={() => handleEdit(store)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreDashboard;
