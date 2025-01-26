import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal, Card, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation
import { addShippingAddress, fetchShippingAddress, updateShippingAddress, deleteShippingAddress } from '../api/shippingApi'; // Import the shipping API functions
import { fetchCartItemsDetail } from '../api/cartApi'; // Import the cart API functions
import { placeOrder } from '../api/orderApi'; // Import the order API function
import { toast } from 'react-toastify'; // Import toast for error messages

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  });
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const customerId = useSelector((state) => state.auth.user?.id);
  const history = useHistory(); // Initialize useHistory

  const fetchAddress = async () => {
    try {
      const response = await fetchShippingAddress(customerId);
      setAddress(response.data.data);
    } catch (error) {
      console.error('Error fetching address:', error);
      toast.error('Error fetching address');
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetchCartItemsDetail(customerId);
      console.log("---response.data", response.data)
      if(response.data?.length){
      setCartItems(response.data);
    }  else {
        console.log('ele---->', response.data)
    }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast.error('Error fetching cart items');
    }
  };

  useEffect(() => {
    if (customerId) {
      fetchAddress();
      fetchCart();
    }
  }, [customerId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAddress) {
        await updateShippingAddress(selectedAddress.id, formData);
        console.log('Shipping address updated:', formData);
      } else {
        await addShippingAddress(customerId, formData);
        console.log('Shipping address added:', formData);
      }
      await fetchAddress();
      setShowModal(false);
    } catch (error) {
      console.error('Error adding/updating shipping address:', error);
      toast.error('Error adding/updating shipping address');
    }
  };

  const handleAddressSelect = (address) => { 
    setFormData({
      address_line1: address.address_line1,
      address_line2: address.address_line2,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country
    });
    setShowModal(true);
  };

  const selectAddress = (address) => {
    setSelectedAddress(address); 
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteShippingAddress(addressId);
      console.log('Shipping address deleted:', addressId);
      await fetchAddress();
    } catch (error) {
      console.error('Error deleting shipping address:', error);
      toast.error('Error deleting shipping address');
    }
  };

  const handleShowModal = () => {
    setSelectedAddress(null);
    setFormData({
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: ''
    });
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        // customer_id: customerId,
        addressId: selectedAddress.id,
        // items: cartItems.map(item => ({
        //   product_id: item.product_id,
        //   variant_id: item.variant_id,
        //   quantity: item.quantity,
        //   price: item.price
        // })),
        total: calculateTotal()
      };
      await placeOrder(orderData);
      console.log('Order placed successfully');
      history.push('/order-success'); // Redirect to order success page
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error placing order');
    }
  };

  return (
    <Container className="mt-5">
      <h1>Checkout</h1>
      <Button variant="secondary" onClick={() => history.goBack()}>Back</Button> {/* Add back button */}
      <Row>
        <Col md={6}>
          <h3>Address History</h3>
          <ul>
            {address?.map((address, index) => (
              <li key={index}>
                <Form.Check
                  type="radio"
                  name="address"
                  id={`address-${index}`}
                  label={`${address.address_line1}, ${address.address_line2}, ${address.city}, ${address.state}, ${address.postal_code}, ${address.country}`}
                  onChange={() => selectAddress(address)}
                  checked={selectedAddress?.id === address.id}
                />
                <Button variant="link" onClick={() => handleAddressSelect(address)}>Edit</Button>
                <Button variant="link" onClick={() => handleDeleteAddress(address.id)}>Delete</Button>
              </li>
            ))}
          </ul>
          <Button variant="secondary" onClick={handleShowModal}>Add New Address</Button>
        </Col>
        <Col md={6}>
          <h3>Order Summary</h3>
          {cartItems?.map(item => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Image src={item.image || "https://placehold.jp/100x100"} thumbnail />
                  </Col>
                  <Col md={8}>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.quantity} x ${item.price}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
          <h4>Total: ${calculateTotal()}</h4>
           <Button variant="primary" onClick={handlePlaceOrder}>Place Order</Button>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAddress ? 'Edit Address' : 'Add New Address'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAddress_line1">
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control
                type="text"
                name="address_line1"
                value={formData.address_line1}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddress_line2">
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control
                type="text"
                name="address_line2"
                value={formData.address_line2}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPostalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">{selectedAddress ? 'Update Address' : 'Add Address'}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CheckoutPage;
