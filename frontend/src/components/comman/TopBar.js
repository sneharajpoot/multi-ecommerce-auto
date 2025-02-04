import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems } from '../../api/cartApi'; // Import the cart API functions
import { logout } from '../../actions/authActions'; // Import the logout action

const TopBar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const customerId = useSelector(state => state.auth.user?.id);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search?query=${searchTerm}`);
  };

  useEffect(() => {
    const updateCartCount = async () => {
      try {
        const response = await fetchCartItems(customerId);
        const cartItems = response.data.cartItems || [];
        setCartCount(cartItems.reduce((count, item) => count + item.quantity, 0));
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    if (customerId) {
      updateCartCount();
    } else {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartCount(cartItems.reduce((count, item) => count + item.quantity, 0));
    }

    const handleStorageChange = () => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartCount(cartItems.reduce((count, item) => count + item.quantity, 0));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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
             <Form inline onSubmit={handleSearch} className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mr-sm-2"
              />
              <Button type="submit" variant="outline-light">Search</Button>
            </Form>
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
                  <Button variant="link">Orders</Button>
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
