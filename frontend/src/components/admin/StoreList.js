import React, { useEffect, useState } from 'react';
import { fetchStores, addStore, updateStore, toggleStoreStatus } from '../../api/storeApi'; // Import the API functions
import './StoreList.css'; // Import the CSS file

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentStore, setCurrentStore] = useState({ id: '', name: '', description: '' });

  useEffect(() => {
    const getStores = async () => {
      try {
        const storesData = await fetchStores();
        setStores(storesData);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    getStores();
  }, []);

  const handleShowModal = (store = { id: '', name: '', description: '' }) => {
    setCurrentStore(store);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentStore({ id: '', name: '', description: '' });
  };

  const handleSaveStore = async () => {
    try {
      if (currentStore.id) {
        await updateStore(currentStore);
      } else {
        await addStore(currentStore);
      }
      const storesData = await fetchStores();
      setStores(storesData);
      handleCloseModal();
    } catch (error) {
      console.error('Error saving store:', error);
    }
  };

  const handleToggleStatus = async (storeId, isActive) => {
    const confirmation = window.confirm(`Are you sure you want to ${isActive ? 'activate' : 'deactivate'} this store?`);
    if (!confirmation) return;

    try {
      await toggleStoreStatus(storeId, isActive);
      const storesData = await fetchStores();
      setStores(storesData);
    } catch (error) {
      console.error('Error toggling store status:', error);
    }
  };

  return (
    <div className=" ">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="text-center my-4">Store List</h2>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary" onClick={() => handleShowModal()}>Add Store</button>
          </div>
          <table className="table table-striped" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stores.map(store => (
                <tr key={store.id}>
                  <td>{store.id}</td>
                  <td>{store.name}</td>
                  <td>{store.description}</td>
                  <td>{store.active}</td>
                  <td>{store.isActive ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button className="btn btn-primary me-2" onClick={() => handleShowModal(store)}>Edit</button>
                    <button
                      className={`btn ${store.isActive ? 'btn-danger' : 'btn-success'}`}
                      onClick={() => handleToggleStatus(store.id, !store.isActive)}
                    >
                      {store.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{currentStore.id ? 'Edit Store' : 'Add Store'}</h5>
                    <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="formStoreName" className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="formStoreName"
                          placeholder="Enter store name"
                          value={currentStore.name}
                          onChange={(e) => setCurrentStore({ ...currentStore, name: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="formStoreDescription" className="form-label">Description</label>
                        <input
                          type="text"
                          className="form-control"
                          id="formStoreDescription"
                          placeholder="Enter store description"
                          value={currentStore.description}
                          onChange={(e) => setCurrentStore({ ...currentStore, description: e.target.value })}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleSaveStore}>Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreList;
