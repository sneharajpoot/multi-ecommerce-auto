import React, { useEffect, useState } from 'react';
import { fetchCategories, addCategory, updateCategory, toggleCategoryStatus } from '../api/categoryApi'; // Import the API functions
import './CategoryList.css'; // Import the CSS file

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: '', name: '', description: '' });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();
  }, []);

  const handleShowModal = (category = { id: '', name: '', description: '' }) => {
    setCurrentCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentCategory({ id: '', name: '', description: '' });
  };

  const handleSaveCategory = async () => {
    try {
      if (currentCategory.id) {
        await updateCategory(currentCategory.id, currentCategory);
      } else {
        await addCategory(currentCategory);
      }
      const response = await fetchCategories();
      setCategories(response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleToggleStatus = async (categoryId) => {
    try {
      await toggleCategoryStatus(categoryId);
      const response = await fetchCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error toggling category status:', error);
    }
  };

  return (
    <div className="">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="text-center my-4">Category List</h2>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary" onClick={() => handleShowModal()}>Add Category</button>
          </div>
          <table className="table table-striped" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th> 
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}> 
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td> 
                  <td>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={category.status} 
                        onChange={() => handleToggleStatus(category.id)} 
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <button className="btn btn-primary me-2" onClick={() => handleShowModal(category)}>Edit</button>
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
                    <h5 className="modal-title">{currentCategory.id ? 'Edit Category' : 'Add Category'}</h5>
                    <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="formCategoryName" className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="formCategoryName"
                          placeholder="Enter category name"
                          value={currentCategory.name}
                          onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="formCategoryDescription" className="form-label">Description</label>
                        <input
                          type="text"
                          className="form-control"
                          id="formCategoryDescription"
                          placeholder="Enter category description"
                          value={currentCategory.description}
                          onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleSaveCategory}>Save Changes</button>
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

export default CategoryList;
