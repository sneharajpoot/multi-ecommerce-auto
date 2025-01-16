import React, { useState, useEffect } from 'react';
import { updateProduct, fetchProducts } from '../api/productApi'; // Import the API functions
import { fetchStores } from '../api/storeApi'; // Import the API function for fetching stores
import { fetchCategories } from '../api/categoryApi'; // Import the API function for fetching categories
import { useParams, useHistory } from 'react-router-dom'; // Import useParams and useHistory for navigation

const UpdateProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const history = useHistory(); // Initialize useHistory
  const [product, setProduct] = useState({ name: '', description: '', price: '', category_id: '', store_id: '' });
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetchProducts();
        const product = response.data.products.find(p => p.id === parseInt(id));
        setProduct(product);
      } catch (error) {
        console.error('Error fetching product:', error);
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

    getProduct();
    getStores();
    getCategories();
  }, [id]);

  const handleUpdateProduct = async () => {
    setLoading(true); // Set loading to true
    try {
      await updateProduct(id, product);
      setMessage('Product updated successfully!');
      setError('');
      setTimeout(() => {
        history.push('/dashboard/products'); // Navigate back to the product list
      }, 2000);
    } catch (error) {
      setError('Error updating product.');
      setMessage('');
      console.error('Error updating product:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleCancel = () => {
    history.push('/dashboard/products'); // Navigate back to the product list
  };

  return (
    <div>
      <h2>Update Product</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="loader">Loading...</div>} {/* Add loader */}
      <form>
        <div className="mb-3">
          <label htmlFor="formProductName" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="formProductName"
            placeholder="Enter product name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formProductDescription" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            id="formProductDescription"
            placeholder="Enter product description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formProductPrice" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="formProductPrice"
            placeholder="Enter product price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formProductCategory" className="form-label">Category</label>
          <select
            className="form-control"
            id="formProductCategory"
            value={product.category_id}
            onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="formProductStore" className="form-label">Store</label>
          <select
            className="form-control"
            id="formProductStore"
            value={product.store_id}
            onChange={(e) => setProduct({ ...product, store_id: e.target.value })}
          >
            <option value="">Select Store</option>
            {stores.map(store => (
              <option key={store.id} value={store.id}>{store.name}</option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleUpdateProduct} disabled={loading}>Update Product</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={loading}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
