const { PaymentGateways, Payments, Refunds } = require('../models'); // Adjust paths to your Sequelize models
const Razorpay = require('razorpay'); // Include Razorpay for example integration
const dotenv = require('dotenv');
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
    const { gatewayId, gatewayTransactionId, status } = req.body;

    const payment = await Payments.findOne({ where: { gateway_transaction_id: gatewayTransactionId } });
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    payment.status = status === 'success' ? 'success' : 'failed';
    await payment.save();

    res.status(200).json({ success: true, message: 'Payment status updated', payment });
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
