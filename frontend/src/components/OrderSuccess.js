import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './OrderSuccess.css'; // Import the CSS file for styling

const OrderSuccess = () => {
  const history = useHistory();

  const handleContinueShopping = () => {
    history.push('/');
  };

  const handleViewOrders = () => {
    history.push('/orders');
  };

  return (
    <Container className="order-success-container text-center mt-5">
      <Row>
        <Col>
          <h1 className="order-success-title">Thank You for Your Order!</h1>
          <p className="order-success-message">Your order has been placed successfully. You will receive a confirmation email shortly.</p>
          <Button variant="primary" onClick={handleContinueShopping} className="m-2">Continue Shopping</Button>
          <Button variant="secondary" onClick={handleViewOrders} className="m-2">View Orders</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSuccess;
