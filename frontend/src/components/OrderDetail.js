import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOrderDetail } from '../api/orderApi'; // Import the order API function

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetchOrderDetail(orderId);
        if (response.data.data) {
          setOrder(response.data.data);
        } else {
          setError('Order not found');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Error fetching order details');
      }
    };

    fetchOrderData();
  }, [orderId]);

  if (error) {
    return (
      <Container className="mt-5">
        <h1>{error}</h1>
      </Container>
    );
  }

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <h1>Order #{order.id}</h1>
      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping Address</Card.Title>
              <Card.Text>
                {order.address_line1}<br />
                {order.address_line2 && <>{order.address_line2}<br /></>}
                {order.city}, {order.state} {order.postal_code}<br />
                {order.country}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <Card.Text>
                <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}<br />
                <strong>Total:</strong> ${order.total_amount}<br />
                <strong>Status:</strong> {order.status}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h3>Items</h3>
      <Row>
        {order.items.map(item => (
          <Col md={4} key={item.id}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Product ID: {item.product_id}</Card.Title>
                <Card.Text>
                  {item.quantity} x ${item.price}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button variant="secondary" onClick={() => window.history.back()}>Back</Button>
    </Container>
  );
};

export default OrderDetail;
