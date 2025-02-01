import React, { useEffect, useState } from "react";
import { Carousel, Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap'; // Import Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Footer from './comman/Footer'; // Import the Footer component
import { searchProducts, brandList } from '../api/productApi'; // Import the searchProducts API function
import { fetchBanners } from '../api/bannerApi'; // Import the fetchBanners API function
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import "./Home.css"; // Import the new CSS file
import config from '../config';

const Home = () => {
  const [products, setProducts] = useState([]);
  // const [brands, setBrands] = useState([{brand: 'Brand 1'}, {brand: 'Brand 2'}, {brand: 'Brand 3'}]);
  const [brands, setBrands] = useState([  ]);
  const [banners, setBanners] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const history = useHistory(); // Initialize useHistory

  const fetchProducts = async (page = 1) => {
    try {
      const response = await searchProducts({ page, limit });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchBannerData = async () => {
    try {
      const response = await fetchBanners();
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const fetchBrandList = async () => {
    try {
      const response = await brandList();
      console.log('response.data', response?.data?.brands);
      setBrands(response?.data?.brands || []);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchBannerData();
    fetchBrandList();
  }, []);

  const handleViewProduct = (productId) => {
    history.push(`/product/${productId}`); // Navigate to the product page
  };

  const handlePageChange = (page) => {
    fetchProducts(page);
  };

  return (
    <>
      {/* Carousel Section */}
      <Carousel className="hero-section">
        {banners.map(banner => (
          <Carousel.Item key={banner.id}>
            <img
              src={config.imgBaseUrl  + banner.image_url + '?imageType=banner'}
              alt={banner.title}
              className="d-block mx-auto"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h3>{banner.title}</h3>
              <p>{banner.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
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
                <Card.Img variant="top" src={(config.imgBaseUrl + product.image_url) || "https://placehold.jp/300x200"} />
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

        {/* Pagination */}
        <Pagination className="mt-4">
          {[...Array(totalPages).keys()].map(page => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
        </Pagination>

        {/* Testimonials and Featured Brands */}
        <Row className="mt-4">
          <Col md={6}>
            <h2>Customer Testimonials</h2>
            <p>"Great products and excellent service!" - Jane Doe</p>
            <p>"I love shopping here, always find what I need." - John Smith</p>
          </Col>
          <Col md={6}>
            <h2>Featured Brands</h2>  
            <p> {brands.map((data,index) =>  <span> {data.brand}  {index == brands.length-1? '':', '}</span> )}  </p>
          </Col>
        </Row>
      </Container>

    </>
  );
};

export default Home;
