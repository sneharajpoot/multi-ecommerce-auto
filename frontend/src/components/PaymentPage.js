import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { createPayment } from '../api/paymentApi'; // Import the payment API function
import { showErrorMessage, showSuccessMessage } from '../utils/toastUtils'; // Import toast functions

const PaymentPage = () => {
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const orderId = params.get('orderId');
  const amount = params.get('amount');
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const handlePayment = async () => {
    try {
      const response = await createPayment({ orderId, amount, gatewayId: paymentMethod });
      showSuccessMessage('Payment initiated successfully');
      // Redirect to payment gateway or handle payment response
      // For example, if using Razorpay, open the Razorpay payment modal
    } catch (error) {
      showErrorMessage('Error initiating payment');
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h1>Payment</h1>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="formPaymentMethod">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control
                as="select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="razorpay">Razorpay</option>
                {/* Add more payment methods as needed */}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handlePayment}>Pay ${amount}</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
