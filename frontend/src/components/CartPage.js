import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { fetchCartItems, removeCartItem, syncCartToServer } from '../api/cartApi'; // Import the cart API functions
import { useSelector } from 'react-redux'; // Import useSelector to get authentication state
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation
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
        console.log('--->', response.data);
        if (response.data?.cartItems?.length) {
          setCartItems(response?.data?.cartItems);
        } else {
          console.log('ele---->', response.data)
        }
      } catch (error) {
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
      console.error('Error removing item from cart:', error);
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
          <Col key={item.id} md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={item.image || "https://placehold.jp/300x200"} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  ${item.price} x {item.quantity}
                </Card.Text>
                <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
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
