import React, { useEffect, useState } from 'react';
import { Card, Form, ListGroup, Row, Col, Button } from 'react-bootstrap';
import { fetchCompleteOrderDetail, updateOrdersStatus, getStatusList, getStatusHistory } from '../../api/orderApi'; // Import the order API functions

const OrderDetails = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [status, setStatus] = useState('');
  const [statusList, setStatusList] = useState([]);
  const [statusHistory, setStatusHistory] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetchCompleteOrderDetail(orderId);
        setOrderDetails(response.data.data);
        setStatus(response.data.data.status);
        const statusHistoryResponse = await getStatusHistory(orderId);
        setStatusHistory(statusHistoryResponse.data.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    const fetchStatusList = async () => {
      try {
        const response = await getStatusList();
        setStatusList(response.data.data);
      } catch (error) {
        console.error('Error fetching status list:', error);
      }
    };

    fetchOrderData();
    fetchStatusList();
  }, [orderId]);

  const handleStatusChange = async () => {
    try {
      await updateOrdersStatus(orderId, { status });
      setOrderDetails({ ...orderDetails, status });
      alert('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status');
    }
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          Order #{orderDetails.id} Details
          <Form.Group controlId="formOrderStatus" className="d-inline-block ms-3">
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statusList.map((statusOption) => (
                <option key={statusOption.id} value={statusOption.id}>
                  {statusOption.status_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="success" onClick={handleStatusChange} className="ms-2">
            Update Status
          </Button>
        </Card.Title>
        <Row>
          <Col md={6}>
            <Card.Text>
              <strong>Date:</strong> {new Date(orderDetails.createdAt).toLocaleDateString()}<br />
              <strong>Total:</strong> ${orderDetails.total_amount}<br />
              <strong>Status:</strong> {orderDetails.status}<br />
              <strong>Shipping Address:</strong><br />
              {orderDetails.address_line1}<br />
              {orderDetails.address_line2 && <>{orderDetails.address_line2}<br /></>}
              {orderDetails.city}, {orderDetails.state} {orderDetails.postal_code}<br />
              {orderDetails.country}
            </Card.Text>
          </Col>
          <Col md={6}>
            <h5>Status History</h5>
            <ListGroup>
              {statusHistory.map((history, index) => (
                <ListGroup.Item key={index}>
                  <strong>{history.status_name}</strong> - {new Date(history.created_at).toLocaleString()}<br />
                  <em>{history.description}</em>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <h5 className="mt-4">Items</h5>
        <ListGroup>
          {orderDetails.items.map(item => (
            <ListGroup.Item key={item.id}>
              <Row>
                <Col md={8}>
                  <strong>Product ID:</strong> {item.product_id}<br />
                  <strong>Quantity:</strong> {item.quantity}<br />
                  <strong>Price:</strong> ${item.price}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default OrderDetails;
