import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import { showErrorMessage } from '../utils/toastUtils';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import { searchProducts } from '../api/productApi';

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get('query') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchSearchResults = async (searchQuery, page = 1) => {
    try {
      const response = await searchProducts({
        query: searchQuery,
        category,
        minPrice,
        maxPrice,
        sort,
        page,
        limit
      });
      setResults(response.data.products);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      showErrorMessage('Error searching products');
    }
  };

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSearchResults(query);
  };

  const handleClearFilters = () => {
    setQuery('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSort('');
    setResults([]);
  };

  const handlePageChange = (page) => {
    fetchSearchResults(query, page);
  };

  return (
    <Container className="mt-5">
      <h1>Search Products</h1>
      <Form onSubmit={handleSearch}>
        <Row>
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Button type="submit" variant="primary">Search</Button>
            <Button variant="secondary" onClick={handleClearFilters} className="ml-2">Clear Filters</Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={4}>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="1">Category 1</option>
              {/* ...existing code for more categories... */}
            </Form.Control>
          </Col>
          <Col md={4}>
            <Form.Control
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={4}>
            <Form.Control
              as="select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="price_asc">Price (Low to High)</option>
              <option value="price_desc">Price (High to Low)</option>
              {/* ...existing code... */}
            </Form.Control>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={4}>
            <Form.Control
              as="select"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            >
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
              {/* ...existing code... */}
            </Form.Control>
          </Col>
        </Row>
      </Form>
      <Row className="mt-4">
        {results.map((product) => (
          <Col md={3} key={product.id} className="mb-3">
            <Card>
              {/* Display product image if available */}
              <Card.Img 
                variant="top" 
                src={product.image_url ? config.imgBaseUrl + product.image_url : "https://placehold.jp/150x150"} 
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{product.store_name}</Card.Subtitle>
                {/* ...existing code... */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination>
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
    </Container>
  );
};

export default SearchPage;