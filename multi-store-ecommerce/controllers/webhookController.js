const crypto = require('crypto');
const { Refunds, Payments } = require('../models');

exports.handleRazorpayWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET; // Load from environment variables
    const razorpaySignature = req.headers['x-razorpay-signature'];

    // Generate the expected signature
    const generatedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    // Verify the signature
    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    // Handle the webhook event
    const event = req.body;
    console.log('Webhook event received:', event);
    switch (event.event) {
        case 'payment.captured': {
          const paymentId = event.payload.payment.entity.id;
          console.log(`Payment captured: ${paymentId}`);
          // Update the payment status in your database
          // Example: Mark payment as successful
          await Payments.update(
            { status: 'success' },
            { where: { gateway_transaction_id: paymentId } }
          );
          break;
        }
      
        case 'payment.failed': {
          const paymentId = event.payload.payment.entity.id;
          console.log(`Payment failed: ${paymentId}`);
          // Update the payment status in your database
          // Example: Mark payment as failed
          
          await Payments.update(
            { status: 'failed' },
            { where: { gateway_transaction_id: paymentId } }
          );
          break;
        }
      
        case 'order.paid': {
          const orderId = event.payload.order.entity.id;
          console.log(`Order paid: ${orderId}`);
          // Example: Update order status in your database
          await Orders.update(
            { payment_status: 'completed' },
            { where: { razorpay_order_id: orderId } }
          );
          break;
        }
      
        case 'refund.processed': {
          const refundId = event.payload.refund.entity.id;
          const paymentId = event.payload.refund.entity.payment_id;
          console.log(`Refund processed: ${refundId} for payment: ${paymentId}`);
          // Example: Mark refund as processed in the Refunds table
          await Refunds.update(
            { status: 'processed' },
            { where: { refund_transaction_id: refundId } }
          );
          break;
        }
      
        default: {
          console.log(`Unhandled event: ${event.event}`);
          // Optionally log unhandled events for debugging purposes
        }
      }
      

    res.status(200).json({ success: true, message: 'Webhook handled successfully' });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
