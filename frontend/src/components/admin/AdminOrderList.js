import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Pagination, Collapse } from 'react-bootstrap';
import { fetchCompleteOrders } from '../../api/orderApi'; // Import the order API functions
import OrderDetails from './OrderDetails'; // Import the OrderDetails component

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

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

  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
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
                          <OrderDetails orderId={order.id}isOpen={expandedOrderId === order.id} />
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
