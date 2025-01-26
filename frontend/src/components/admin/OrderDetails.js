import React, { useEffect, useState } from 'react';
import { Card, Form, ListGroup, Row, Col, Button } from 'react-bootstrap';
import { fetchCompleteOrderDetail, updateOrdersStatus, getStatusList, getStatusHistory, addOrUpdateStatusHistory } from '../../api/orderApi'; // Import the order API functions

const OrderDetails = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [statusList, setStatusList] = useState([]);
  const [statusHistory, setStatusHistory] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState([]);
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetchCompleteOrderDetail(orderId);
        setOrderDetails(response.data.data);
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
      const statusHistoryResponse = await getStatusHistory(orderId);
      setStatusHistory(statusHistoryResponse.data.data);
      setStatus('');
      alert('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status');
    }
  };

  const handleStatusUpdateChange = (index, field, value) => {
    const newStatusUpdates = [...statusUpdates];
    newStatusUpdates[index][field] = value;
    setStatusUpdates(newStatusUpdates);
  };

  const handleAddStatusUpdate = () => {
    setStatusUpdates([...statusUpdates, { id: 0, status: '', description: '', is_visible: true, action_date: new Date().toISOString() }]);
  };

  const handleRemoveStatusUpdate = (index) => {
    const newStatusUpdates = [...statusUpdates];
    newStatusUpdates.splice(index, 1);
    setStatusUpdates(newStatusUpdates);
  };

  const handleEditStatusUpdate = () => {
    const updates = statusHistory.map(history => ({
      id: history.id,
      status: history.status_id,
      description: history.description,
      is_visible: history.is_visible,
      action_date: history.action_date
    }));
    setStatusUpdates(updates);
    setEditing(true);
  };

  const handleSaveStatusUpdates = async () => {
    try {
      await addOrUpdateStatusHistory(orderId, statusUpdates);
      const statusHistoryResponse = await getStatusHistory(orderId);
      setStatusHistory(statusHistoryResponse.data.data);
      setStatusUpdates([]);
      setEditing(false);
      alert('Order statuses updated successfully');
    } catch (error) {
      console.error('Error updating order statuses:', error);
      alert('Error updating order statuses');
    }
  };

  const handleCancelEdit = () => {
    setStatusUpdates([]);
    setEditing(false);
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
            <h5 className="mt-4">Status History
              {
                !editing ? (
                  <Button variant="link" onClick={handleEditStatusUpdate} className="mt-3 ms-2">
                    Edit Statuses
                  </Button>) : (
                  <Button variant="link" onClick={handleCancelEdit} className="mt-3 ms-2">
                    Cancel
                  </Button>)
              }
            </h5>
            <ListGroup>
              {statusHistory.map((history, index) => (
                <ListGroup.Item key={index}>
                  <strong>{history.status_name}</strong> - {new Date(history.action_date).toLocaleString()}<br />
                  <em>{history.description}</em><br />
                  <strong>Visible:</strong> {history.is_visible ? 'Yes' : 'No'}
                </ListGroup.Item>
              ))}
            </ListGroup>
            {editing && statusUpdates.map((update, index) => (
              <Row key={index}>
                <Col md={3}>
                  <Form.Group controlId={`formNewStatus-${index}`} className="mt-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      value={update.status}
                      onChange={(e) => handleStatusUpdateChange(index, 'status', e.target.value)}
                    >
                      <option value="">Select Status</option>
                      {statusList.map((statusOption) => (
                        <option key={statusOption.id} value={statusOption.id}>
                          {statusOption.status_name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId={`formActionDate-${index}`} className="mt-3">
                    <Form.Label>Action Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={update.action_date? new Date(update.action_date).toISOString().slice(0, 16): null}
                      onChange={(e) => handleStatusUpdateChange(index, 'action_date', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId={`formDescription-${index}`} className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      value={update.description}
                      onChange={(e) => handleStatusUpdateChange(index, 'description', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={1}>
                  <Form.Group controlId={`formIsVisible-${index}`} className="mt-5">
                    <Form.Check
                      type="checkbox"
                      checked={update.is_visible}
                      onChange={(e) => handleStatusUpdateChange(index, 'is_visible', e.target.checked)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Button variant="danger" className="mt-5" onClick={() => handleRemoveStatusUpdate(index)}>
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
            {editing && (
              <>
                <Button variant="primary" onClick={handleAddStatusUpdate} className="mt-3">
                  Add New
                </Button>
                <Button variant="success" onClick={handleSaveStatusUpdates} className="mt-3 ms-2">
                  Save Status Updates
                </Button>
                <Button variant="secondary" onClick={handleCancelEdit} className="mt-3 ms-2">
                  Cancel
                </Button>
              </>
            )}
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
