import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../api/productApi'; // Import the API functions
import { fetchStores } from '../api/storeApi'; // Import the API function for fetching stores
import { fetchCategories } from '../api/categoryApi'; // Import the API function for fetching categories
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const history = useHistory(); // Initialize useHistory

  const getProducts = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await fetchProducts(currentPage, selectedStore, selectedCategory);
      setProducts(response.data.products); // Update to handle the new response structure
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError('Error fetching products.');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const getStores = async () => {
    try {
      const response = await fetchStores();
      setStores(response);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [currentPage, selectedStore, selectedCategory]);

  useEffect(() => {
    getStores();
    getCategories();
  }, []);

  const handleDeleteProduct = async (productId) => {
    setLoading(true); // Set loading to true
    try {
      await deleteProduct(productId);
      const response = await fetchProducts(currentPage, selectedStore, selectedCategory);
      setProducts(response.data.products); // Update to handle the new response structure
      setMessage('Product deleted successfully!');
      setError('');
    } catch (error) {
      setError('Error deleting product.');
      setMessage('');
      console.error('Error deleting product:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    return (
      (selectedStore === '' || product.store_id === parseInt(selectedStore)) &&
      (selectedCategory === '' || product.category_id === parseInt(selectedCategory))
    );
  });

  return (
    <div className=" " >
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="text-center my-4">Product List</h2>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="loader">Loading...</div>} {/* Add loader */}
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary" onClick={() => history.push('/dashboard/products/add')}>Add Product</button>
          </div>
          <div className="filters mb-3">
            <select value={selectedStore} onChange={handleStoreChange} className="form-select me-2">
              <option value="">All Stores</option>
              {stores.map(store => (
                <option key={store.id} value={store.id}>{store.name}</option>
              ))}
            </select>
            <select value={selectedCategory} onChange={handleCategoryChange} className="form-select">
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <table className="table table-striped" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Store</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{(currentPage - 1) * 10 + index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{categories.find(category => category.id === product.category_id)?.name}</td>
                  <td>{stores.find(store => store.id === product.store_id)?.name}</td>
                  <td>
                    <button className="btn btn-primary me-2" onClick={() => history.push(`/dashboard/products/update/${product.id}`)}>Edit</button>
                    <button className="btn btn-danger me-2" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                    <button className="btn btn-info" onClick={() => history.push(`/dashboard/products/${product.id}`)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
