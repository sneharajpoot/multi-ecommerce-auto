import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/productApi'; // Import the API function
import { useParams, useHistory } from 'react-router-dom'; // Import useParams and useHistory for navigation

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const history = useHistory(); // Initialize useHistory
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState('');

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true); // Set loading to true
      try {
        const response = await fetchProducts();
        const product = response.data.products.find(p => p.id === parseInt(id));
        setProduct(product);
      } catch (error) {
        setError('Error fetching product details.');
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    getProduct();
  }, [id]);

  const handleBack = () => {
    history.push('/dashboard/products'); // Navigate back to the product list
  };

  if (loading) {
    return <div className="loader">Loading...</div>; // Add loader
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="container">
      <h2>Product Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text"><strong>Description:</strong> {product.description}</p>
          <p className="card-text"><strong>Price:</strong> ${product.price}</p>
          <p className="card-text"><strong>SKU:</strong> {product.sku}</p>
          <p className="card-text"><strong>Status:</strong> {product.status}</p>
          <p className="card-text"><strong>Store ID:</strong> {product.store_id}</p>
          <p className="card-text"><strong>Category ID:</strong> {product.category_id}</p>
          <button className="btn btn-secondary" onClick={handleBack}>Back to Products</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
