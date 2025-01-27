const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticate, authorizeAdmin, authorize } = require('../middlewares/authMiddleware');

const webhookController = require('../controllers/webhookController');
// Get all payment gateways
router.get('/gateways', authenticate, paymentController.getPaymentGateways);

// Create a payment
router.post('/create-payment', authenticate, paymentController.createPayment);

// Verify payment
router.post('/verify-payment', authenticate, paymentController.verifyPayment);

// Process refund
router.post('/process-refund', authenticate, paymentController.processRefund);

// Webhook endpoint
router.post('/webhook', express.json({ verify: (req, res, buf) => (req.rawBody = buf) }), webhookController.handleRazorpayWebhook);

module.exports = router;
