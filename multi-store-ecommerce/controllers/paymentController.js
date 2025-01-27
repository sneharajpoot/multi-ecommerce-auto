const { PaymentGateways, Payments, Refunds } = require('../models'); // Adjust paths to your Sequelize models
const Razorpay = require('razorpay'); // Include Razorpay for example integration
const dotenv = require('dotenv');
const crypto = require('crypto');
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Fetch Active Payment Gateways
exports.getPaymentGateways = async (req, res) => {
  try {
    const gateways = await PaymentGateways.findAll({ where: { is_active: true } });
    res.status(200).json({ success: true, gateways });
  } catch (error) {
    console.error('Error fetching payment gateways:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Create Payment
exports.createPayment = async (req, res) => {
  try {
    const { gatewayId, amount, orderId } = req.body;
    // {"gatewayId":1,"amount":176,"orderId":14}
    // Get the gateway
    const gateway = await PaymentGateways.findByPk(gatewayId);
    if (!gateway) {
      return res.status(404).json({ success: false, message: 'Payment gateway not found' });
    }

    // Example: Razorpay payment order creation
    if (gateway.type === 'razorpay') {
      const order = await razorpay.orders.create({
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        receipt: `receipt_${orderId}`,
      });

      console.log('Razorpay order:', order);
      // Save payment in the database
      const payment = await Payments.create({
        order_id: orderId,
        gateway_id: gatewayId,
        gateway_transaction_id: order.id,
        amount,
        status: 'pending',
      });

      return res.status(200).json({ success: true, payment, razorpayOrder: order });
    }

    res.status(400).json({ success: false, message: 'Unsupported gateway type' });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Verify Payment

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Find the payment record by order_id
    const payment = await Payments.findOne({ where: { gateway_transaction_id: razorpay_order_id } });
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    // Generate the expected signature using Razorpay's secret key
    const secret = process.env.RAZORPAY_KEY_SECRET; // Load Razorpay secret from environment variables
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const expectedSignature = hmac.digest('hex');

    // Compare the expected signature with the Razorpay-provided signature
    if (expectedSignature !== razorpay_signature) {
      payment.status = 'failed';
      await payment.save();
      return res.status(400).json({ success: false, message: 'Invalid payment signature', payment });
    }

    // Update the payment record to success
    payment.status = 'success';
    payment.razorpay_payment_id = razorpay_payment_id;
    payment.razorpay_signature = razorpay_signature;
    await payment.save();

    res.status(200).json({ success: true, message: 'Payment verified successfully', payment });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Process Refund
exports.processRefund = async (req, res) => {
  try {
    const { paymentId, amount } = req.body;

    const payment = await Payments.findByPk(paymentId);
    if (!payment || payment.status !== 'success') {
      return res.status(400).json({ success: false, message: 'Refund not possible for this payment' });
    }

    // Example: Refund via Razorpay
    const refund = await razorpay.payments.refund(payment.gateway_transaction_id, { amount: amount * 100 });

    const refundRecord = await Refunds.create({
      payment_id: paymentId,
      refund_transaction_id: refund.id,
      amount,
      status: 'processed',
    });

    res.status(200).json({ success: true, message: 'Refund processed', refund: refundRecord });
  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
