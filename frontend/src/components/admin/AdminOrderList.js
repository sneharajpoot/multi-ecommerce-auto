import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Pagination, Collapse, Card, Form } from 'react-bootstrap';
import { fetchCompleteOrderDetail, fetchCompleteOrders, updateOrdersStatus, getStatusList, getStatusHistory } from '../../api/orderApi'; // Import the order API functions
import { Link } from 'react-router-dom'; // Import Link for navigation

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [status, setStatus] = useState('');
  const [statusList, setStatusList] = useState([]);
  const [statusHistory, setStatusHistory] = useState({});

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetchCompleteOrders(currentPage);
        setOrders(response?.data?.data || []);
        setTotalPages(response?.data?.totalPages || 1);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchStatusList = async () => {
      try {
        const response = await getStatusList();
        setStatusList(response?.data?.data || []);
      } catch (error) {
        console.error('Error fetching status list:', error);
      }
    };

    fetchOrderData();
    fetchStatusList();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleOrderDetails = async (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
      if (!orderDetails[orderId]) {
        try {
          const response = await fetchCompleteOrderDetail(orderId);
          setOrderDetails({ ...orderDetails, [orderId]: response.data.data });
          setStatus(response.data.data.status);
          const statusHistoryResponse = await getStatusHistory(orderId);
          setStatusHistory({ ...statusHistory, [orderId]: statusHistoryResponse.data.data });
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      }
    }
  };

  const handleStatusChange = async (orderId) => {
    try {
      await updateOrdersStatus(orderId, { status });
      setOrderDetails({ ...orderDetails, [orderId]: { ...orderDetails[orderId], status } });
      alert('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status');
    }
  };

  return (
    <Container className="mt-5">
      <h1>All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <React.Fragment key={order.id}>
                  <tr>
                    <td>{order.id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${order.total}</td>
                    <td>{order.status}</td>
                    <td>
                      <Button variant="primary" size="sm" onClick={() => toggleOrderDetails(order.id)}>
                        {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">
                      <Collapse in={expandedOrderId === order.id}>
                        <div>
                          {orderDetails[order.id] ? (
                            <Card>
                              <Card.Body>
                                <Card.Title>Order #{orderDetails[order.id].id} Details</Card.Title>
                                <Card.Text>
                                  <strong>Date:</strong> {new Date(orderDetails[order.id].createdAt).toLocaleDateString()}<br />
                                  <strong>Total:</strong> ${orderDetails[order.id].total_amount}<br />
                                  <strong>Status:</strong> {orderDetails[order.id].status}<br />
                                  <strong>Shipping Address:</strong><br />
                                  {orderDetails[order.id].address_line1}<br />
                                  {orderDetails[order.id].address_line2 && <>{orderDetails[order.id].address_line2}<br /></>}
                                  {orderDetails[order.id].city}, {orderDetails[order.id].state} {orderDetails[order.id].postal_code}<br />
                                  {orderDetails[order.id].country}
                                </Card.Text>
                                <h5>Items</h5>
                                {orderDetails[order.id].items.map(item => (
                                  <Card key={item.id} className="mb-3">
                                    <Card.Body>
                                      <Card.Title>Product ID: {item.product_id}</Card.Title>
                                      <Card.Text>
                                        {item.quantity} x ${item.price}
                                      </Card.Text>
                                    </Card.Body>
                                  </Card>
                                ))}
                                <Form.Group controlId="formOrderStatus">
                                  <Form.Label>Change Order Status</Form.Label>
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
                                <Button variant="success" onClick={() => handleStatusChange(order.id)} className="mt-3">
                                  Update Status
                                </Button>
                                <h5>Status History</h5>
                                {statusHistory[order.id] ? (
                                  <ul>
                                    {statusHistory[order.id].map((history, index) => (
                                      <li key={index}>
                                        <strong>{history.status_name}</strong> - {new Date(history.action_date).toLocaleString()}
                                      </li>
                                    ))
                                    }
                                  </ul>
                                ) : (
                                  <div>Loading status history...</div>
                                )}
                              </Card.Body>
                            </Card>
                          ) : (
                            <div>Loading...</div>
                          )}
                        </div>
                      </Collapse>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
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

export default AdminOrderList;
