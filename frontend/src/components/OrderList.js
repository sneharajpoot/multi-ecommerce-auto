import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Pagination, Form } from 'react-bootstrap';
import { fetchOrders } from '../api/orderApi'; // Import the order API function
import { useSelector } from 'react-redux'; // Import useSelector to get authentication state
import { Link, useHistory } from 'react-router-dom'; // Import Link and useHistory for navigation
import { showErrorMessage } from '../utils/toastUtils'; // Import toast functions

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const customerId = useSelector((state) => state.auth.user?.id); // Get customerId from auth state
  const history = useHistory();

  const fetchOrderData = async (page = 1) => {
    try {
      const response = await fetchOrders(page, limit);
      setOrders(response?.data?.data || []);
      setTotalPages(response?.data?.totalPages || 1);
      setCurrentPage(response?.data?.currentPage || 1);
    } catch (error) {
      showErrorMessage(error.message || 'Error fetching orders');
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (customerId) {
      fetchOrderData();
    }
  }, [customerId, limit]);

  const handlePageChange = (page) => {
    fetchOrderData(page);
  };

  const handlePayment = (orderId, amount) => {
    history.push(`/payment?orderId=${orderId}&amount=${amount}`);
  };

  return (
    <Container className="mt-5">
      <h1>Your Orders</h1>
      <Form.Group controlId="formLimit">
        <Form.Label>Items per page</Form.Label>
        <Form.Control
          as="select"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Form.Control>
      </Form.Group>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          <Row>
            {orders.map(order => (
              <Col md={6} key={order.id}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Order #{order.id}</Card.Title>
                    <Card.Text>
                      <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}<br />
                      <strong>Total:</strong> ${order.total_amount}<br />
                      <strong>Status:</strong> {order.status}<br />
                      <strong>Payment Status:</strong> {order.payment_status || 'Pending'}
                    </Card.Text>
                    <Link to={`/orders/${order.id}`}>
                      <Button variant="primary">View Details</Button>
                    </Link>
                    {order.payment_status !== 'Paid' && (
                      <Button variant="success" onClick={() => handlePayment(order.id, order.total_amount)} className="ml-2">Pay Now</Button>
                    )}
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
        </>
      )}
    </Container>
  );
};

export default OrderList;
