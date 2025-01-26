import React, { useEffect, useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { getPaymentGateways, createPayment, verifyPayment } from '../api/paymentApi';
import { useSelector } from 'react-redux';

const PaymentPage = ({amount, orderId }) => {
    console.log("amount", amount, orderId)
  const [gateways, setGateways] = useState([]);
  const [selectedGateway, setSelectedGateway] = useState(null);
//   const [amount, setAmount] = useState(0);
//   const [orderId, setOrderId] = useState('12345');
  const customerId = useSelector((state) => state.auth.user?.id);
  const user = useSelector((state) => state.auth.user );

  
  useEffect(() => {
    const fetchGateways = async () => {
      try {
        const response = await getPaymentGateways();
        setGateways(response.data.gateways);
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
      console.log('Razorpay order:',  razorpayOrder);

      console.log('user:', user);
      if (selectedGateway.type === 'razorpay') {
        const options = {
          key: 'rzp_test_adcAVlhJCsuoVY',
          amount: amount * 100,
          currency: 'INR',
          name: user.name,
          description: 'Order Id'+ orderId,
          order_id: razorpayOrder.id,
          handler: async (response) => {
            console.log('Payment response:', response);
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
            await verifyPayment({
              gatewayId: selectedGateway.id,
              gatewayTransactionId: razorpay_order_id,
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
            contact: '',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open({
            container: '#razorpay-embedded-form', // Specify the `id` of the div to embed
            method: 'embed',
          });
        // rzp.open();
      }
    } catch (error) {
      console.error('Error handling payment:', error);
      alert('Payment failed!');
    }
  };

  return (
    <div>
      <h1>Make a Payment</h1>
      <Form.Group>
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" value={amount}   />
      </Form.Group>
      <Form.Group>
        <Form.Label>Payment Gateway</Form.Label>
        <Form.Control as="select" onChange={(e) => setSelectedGateway(JSON.parse(e.target.value))}>
          <option value="">Select Gateway</option>
          {gateways.map((gateway) => (
            <option key={gateway.id} value={JSON.stringify(gateway)}>
              {gateway.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button onClick={handlePayment}>Pay Now</Button>

      <div id="razorpay-embedded-form"></div>
    </div>
  );
};

export default PaymentPage;
