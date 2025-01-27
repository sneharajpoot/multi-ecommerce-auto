import React, { useEffect, useState } from 'react';
import { Button, Form, Alert, Card, Container, Row, Col } from 'react-bootstrap';
import { getPaymentGateways, createPayment, verifyPayment } from '../api/paymentApi';
import { useSelector } from 'react-redux';

const PaymentPage = ({ amount, orderId }) => {
  console.log("amount", amount, orderId);
  const [gateways, setGateways] = useState([]);
  const [selectedGateway, setSelectedGateway] = useState(null);
  const customerId = useSelector((state) => state.auth.user?.id);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchGateways = async () => {
      try {
        const response = await getPaymentGateways();
        const fetchedGateways = response.data.gateways;
        setGateways(fetchedGateways);
        if (fetchedGateways.length === 1) {
          setSelectedGateway(fetchedGateways[0]); // Automatically select the single gateway
        }
      } catch (error) {
        console.error('Error fetching gateways:', error);
      }
    };

    fetchGateways();

    // Dynamically load Razorpay SDK
    const loadRazorpayScript = () => {
      if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    try {
      if (!selectedGateway) {
        alert('Please select a payment gateway');
        return;
      }

      const response = await createPayment({ gatewayId: selectedGateway.id, amount, orderId });
      const { razorpayOrder } = response.data;
      console.log('Razorpay order:', razorpayOrder);

      console.log('user:', user);
      if (selectedGateway.type === 'razorpay') {
        const options = {
          key: 'rzp_test_adcAVlhJCsuoVY',
          amount: amount * 100,
          currency: 'INR',
          name: user.name,
          description: 'Order Id ' + orderId,
          order_id: razorpayOrder.id,
          handler: async (response) => {
            console.log('Payment response:', response);
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
            await verifyPayment({
              gatewayId: selectedGateway.id,
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              status: 'success',
            });
            alert('Payment successful!');
          },
          modal: {
            ondismiss: () => {
              console.log('Payment modal dismissed');
            },
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.phone,
          },
          theme: {
            color: '#3399cc',
          },
          container: '#razorpay-embedded-form', // Embed Razorpay form
          method: 'embed',
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error('Error handling payment:', error);
      alert('Payment failed!');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4">
            <Card.Body>
              <h3 className="text-center">Payment</h3>
              <h5 className="text-center mb-4">Payment Amount: ₹{amount}</h5>

              {gateways.length > 1 && (
                <Form.Group>
                  <Form.Label>Select Payment Gateway</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setSelectedGateway(JSON.parse(e.target.value))}
                  >
                    <option value="">-- Select Gateway --</option>
                    {gateways.map((gateway) => (
                      <option key={gateway.id} value={JSON.stringify(gateway)}>
                        {gateway.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )}

              <div className="text-center mt-4">
                <Button variant="primary" onClick={handlePayment} className="w-50">
                  Pay Now
                </Button>
              </div>

              <div id="razorpay-embedded-form" className="mt-4"></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
