import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems } from '../api/cartApi'; // Import the cart API functions
import { logout } from '../actions/authActions'; // Import the logout action

const TopBar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const customerId = useSelector(state => state.auth.user?.id);
  const [cartCount, setCartCount] = useState(0);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  useEffect(() => {
    const updateCartCount = async () => {
      try {
        const response = await fetchCartItems(customerId);
        const cartItems = response.data || [];
        setCartCount(cartItems.length);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    if (customerId) {
      updateCartCount();
    }
  }, [customerId]);

  return (
    <header className="header-section">
      <Container>
        <Row className="align-items-center">
          <Col md={4}>
            <Link to="/">
              <h1 className="logo">E-commerce</h1>
            </Link>
          </Col>
          <Col md={4}>
            <InputGroup>
              <Form.Control
                placeholder="Search for products"
                aria-label="Search for products"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">
                Search
              </Button>
            </InputGroup>
          </Col>
          <Col md={4} className="text-end">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="link">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="link">Signup</Button>
                </Link>
              </>
            ) : (
              <>
                <Button variant="link" onClick={handleLogout}>Logout</Button>
                <Link to="/orders">
                  <Button variant="link">Orders</Button> {/* Add this line */}
                </Link>
              </>
            )}
            <Link to="/cart">
              <Button variant="link">Cart ({cartCount})</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default TopBar;
