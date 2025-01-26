import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Pagination, Collapse, Form } from 'react-bootstrap';
import { fetchCompleteOrders } from '../../api/orderApi'; // Import the order and store API functions
import OrderDetails from './OrderDetails'; // Import the OrderDetails component
import { fetchStores } from '../../api/storeApi'; // Import the order and store API functions

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [storeList, setStoreList] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetchCompleteOrders(currentPage, selectedStore);
        setOrders(response?.data?.data || []);
        setTotalPages(response?.data?.totalPages || 1);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchStoreData = async () => {
      try {
        const response = await fetchStores();
        setStoreList(response);
      } catch (error) {
        console.error('Error fetching store list:', error);
      }
    };

    fetchOrderData();
    fetchStoreData();
  }, [currentPage, selectedStore]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStoreChange = async (e) => {
    const storeId = e.target.value;
    setSelectedStore(storeId);
    setCurrentPage(1);
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
      <Form.Group controlId="formStoreFilter" className="mb-3">
        <Form.Label>Filter by Store</Form.Label>
        <Form.Control
          as="select"
          value={selectedStore}
          onChange={handleStoreChange}
        >
          <option value="">All Stores</option>
          {storeList.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Postal Code/state</th>
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
                    <td>{order.uuid}</td>
                    <td>{order.postal_code}/{order.state}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${order.total_amount}</td>
                    <td>{order.status}</td>
                    <td>
                      <Button variant="primary" size="sm" onClick={() => toggleOrderDetails(order.id)}>
                        {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6">
                      <Collapse in={expandedOrderId === order.id}>
                        <div>
                          <OrderDetails orderId={order.id} isOpen={expandedOrderId === order.id} />
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
