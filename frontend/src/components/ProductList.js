import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../api/productApi'; // Import the API functions
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true); // Set loading to true
      try {
        const response = await fetchProducts(currentPage);
        setProducts(response.data.products); // Update to handle the new response structure
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError('Error fetching products.');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    getProducts();
  }, [currentPage]);

  const handleDeleteProduct = async (productId) => {
    setLoading(true); // Set loading to true
    try {
      await deleteProduct(productId);
      const response = await fetchProducts(currentPage);
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

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="text-center my-4">Product List</h2>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="loader">Loading...</div>} {/* Add loader */}
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary" onClick={() => history.push('/dashboard/products/add')}>Add Product</button>
          </div>
          <table className="table table-striped" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}> 
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
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
