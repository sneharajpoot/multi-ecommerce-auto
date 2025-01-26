import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get URL parameters
import { Card, Form, ListGroup, Row, Col, Button } from 'react-bootstrap';
import { fetchOrderDetail, cancelOrdersStatus, getStatusList, getStatusHistory, addOrUpdateStatusHistory } from '../api/orderApi'; // Import the order API functions
import { showErrorMessage, showSuccessMessage } from '../utils/toastUtils'; // Import toast functions

const OrderDetail = () => {
  const { orderId } = useParams(); // Get the orderId from the URL parameters
  const [orderDetails, setOrderDetails] = useState(null);
  const [statusList, setStatusList] = useState([]);
  const [statusHistory, setStatusHistory] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetchOrderDetail(orderId);
        setOrderDetails(response.data.data);
        const statusHistoryResponse = await getStatusHistory(orderId);
        setStatusHistory(statusHistoryResponse.data.data);
      } catch (error) {
        showErrorMessage('Error fetching order details');
        console.error('Error fetching order details:', error);
      }
    };



    fetchOrderData();

  }, [orderId]);

  const cancelorder = async () => {
    try {
      await cancelOrdersStatus(orderId);
      const statusHistoryResponse = await getStatusHistory(orderId);
      setStatusHistory(statusHistoryResponse.data.data);
      setStatus('');
      showSuccessMessage('Order status updated successfully');
    } catch (error) {
      showErrorMessage(error.message || 'Error Cancel order status');
      console.error('Error Cancel order status:', error);
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


            {
              ['Pending', 'Payment Confirmed', 'Order Confirmed', 'Processing'].includes(orderDetails.status) ?
                (
                  <Button variant="success" onClick={cancelorder} className="ms-2">
                    Cancel order
                  </Button>)
                :
                (null)
            }
            <h5 className="mt-4">Status History  </h5>
            <ListGroup>
              {statusHistory.map((history, index) => (
                <ListGroup.Item key={index}>
                  <strong>{history.status_name}</strong> - {new Date(history.action_date).toLocaleString()}<br />
                  <em>{history.description}</em><br />
                  <strong>Visible:</strong> {history.is_visible ? 'Yes' : 'No'}
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

export default OrderDetail;
