import React, { useEffect, useState } from "react";
import { Carousel, Container, Row, Col, Card, Button } from 'react-bootstrap'; // Import Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Footer from './comman/Footer'; // Import the Footer component
import { searchProducts } from '../api/productApi'; // Import the searchProducts API function
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import "./Home.css"; // Import the new CSS file

const Home = () => {
  const [products, setProducts] = useState([]);
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await searchProducts({page :1, limit:8});
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleViewProduct = (productId) => {
    history.push(`/product/${productId}`); // Navigate to the product page
  };

  return (
    <>
      {/* Remove the TopBar component */}

      {/* Carousel Section */}
      <Carousel className="hero-section">
        <Carousel.Item>
          <img
            src="https://placehold.jp/1920x400"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://placehold.jp/1920x600"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://placehold.jp/1920x600"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Main Content Section */}
      <Container className="mt-5">
        <h1 className="text-center">Welcome to Our E-commerce Site</h1>
        <p className="text-center">Discover our wide range of products and enjoy shopping with us!</p>

        {/* Featured Products */}
        <Row className="mt-4">
          {products.map(product => (
            <Col md={3} key={product.id}>
              <Card>
                <Card.Img variant="top" src={product.image || "https://placehold.jp/300x200"} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.description}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleViewProduct(product.id)}>View Product</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Testimonials and Featured Brands */}
        <Row className="mt-4">
          <Col md={6}>
            <h2>Customer Testimonials</h2>
            <p>"Great products and excellent service!" - Jane Doe</p>
            <p>"I love shopping here, always find what I need." - John Smith</p>
          </Col>
          <Col md={6}>
            <h2>Featured Brands</h2>
            <p>Brand 1, Brand 2, Brand 3</p>
          </Col>
        </Row>
      </Container>

      <Footer /> {/* Use the Footer component */}
    </>
  );
};

export default Home;
