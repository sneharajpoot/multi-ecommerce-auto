import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { fetchBestSellers } from '../api/productApi'; // Import the fetchBestSellers API function
import { useHistory } from 'react-router-dom';
import config from '../config';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const history = useHistory();

  const fetchProducts = async () => {
    try {
      const response = await fetchBestSellers();
      setProducts(response.products);
    } catch (error) {
      console.error('Error fetching best sellers:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleViewProduct = (productId) => {
    history.push(`/product/${productId}`);
  };

  return (
    <Container className="mt-5">
      <h1>Best Sellers</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <Row>
          {products.map(product => (
            <Col md={3} key={product.id}>
              <Card>
                <Card.Img variant="top" src={(config.imgBaseUrl + product.image_url) || "https://placehold.jp/300x200"} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Button variant="primary" onClick={() => handleViewProduct(product.id)}>View Product</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default BestSellers;
