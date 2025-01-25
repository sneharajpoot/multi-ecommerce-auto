import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { fetchOrders } from '../../api/orderApi'; // Import the order API function
import { Link } from 'react-router-dom'; // Import Link for navigation

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetchOrders();
        setOrders(response?.data?.data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrderData();
  }, []);

  return (
    <Container className="mt-5">
      <h1>All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Row>
          {orders.map(order => (
            <Col md={6} key={order.id}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Order #{order.id}</Card.Title>
                  <Card.Text>
                    <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}<br />
                    <strong>Total:</strong> ${order.total}<br />
                    <strong>Status:</strong> {order.status}
                  </Card.Text>
                  <Link to={`/admin/orders/${order.id}`}>
                    <Button variant="primary">View Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AdminOrderList;
