import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { fetchCartItems, removeCartItem, updateCartItemQuantity, syncCartToServer } from '../api/cartApi'; // Import the cart API functions
import { useSelector } from 'react-redux'; // Import useSelector to get authentication state
import { useHistory, Link } from 'react-router-dom'; // Import useHistory and Link for navigation
import { showErrorMessage } from '../utils/toastUtils'; // Import toast functions
import { FaTrash } from 'react-icons/fa'; // Import delete icon
import './CartPage.css'; // Import the CSS file for styling

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const customerId = useSelector((state) => state.auth.user?.id);
  const history = useHistory();

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await fetchCartItems(customerId);
        if (response.data?.cartItems?.length) {
          setCartItems(response?.data?.cartItems);
        } else {
        }
      } catch (error) {
        showErrorMessage('Error fetching cart items');
        console.error('Error fetching cart items:', error);
      }
    };

    getCartItems();
  }, [customerId]);

  const handleRemoveFromCart = async (itemId) => {
    try {
      await removeCartItem(itemId, customerId);
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (error) {
      showErrorMessage('Error removing item from cart');
      console.error('Error removing item from cart:', error);
    }
  };

  const handleQuantityChange = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCartItemQuantity(itemId, customerId, quantity);
      setCartItems(cartItems.map(item => item.id === itemId ? { ...item, quantity } : item));
    } catch (error) {
      showErrorMessage('Error updating item quantity');
      console.error('Error updating item quantity:', error);
    }
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      history.push('/checkout');
    } else {
      history.push('/login');
    }
  };

  useEffect(() => {
    if (isAuthenticated && customerId) {
      syncCartToServer(customerId);
    }
  }, [isAuthenticated, customerId]);

  return (
    <Container className="mt-5">
      <h1>Shopping Cart</h1>
      <Row>
        {cartItems?.map(item => (
          <Col md={12} key={item.id}>
            <Card className="mb-3">
              <Card.Body>
                <Row>
                  <Col md={2}>
                    <Card.Img variant="top" src={item.image || "https://placehold.jp/50x50.png"} />
                  </Col>
                  <Col md={10}>
                    <Card.Title>
                      <Link to={`/product/${item.product_id}`}>
                        #{item.product_id} {item.product_name}
                      </Link>
                    </Card.Title>
                    <Card.Text>
                      {item.quantity} x ${item.variant_price || item.product_price}
                    </Card.Text>
                    <div className="d-flex align-items-center">
                      <Button variant="outline-secondary" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</Button>
                      <Form.Control
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        min="1"
                        className="mx-2"
                        style={{ width: '60px' }}
                      />
                      <Button variant="outline-secondary" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</Button>
                    </div>
                    <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)} className="mt-2">
                      <FaTrash /> Remove
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button variant="primary" onClick={handleCheckout}>Proceed to Checkout</Button>
    </Container>
  );
};

export default CartPage;
