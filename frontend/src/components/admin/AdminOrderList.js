import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Pagination, Collapse, Card } from 'react-bootstrap';
import { fetchCompleteOrderDetail, fetchCompleteOrders } from '../../api/orderApi'; // Import the order API functions
import { Link } from 'react-router-dom'; // Import Link for navigation

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});

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

    fetchOrderData();
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
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      }
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
