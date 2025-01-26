const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Get all payment gateways
router.get('/gateways', paymentController.getPaymentGateways);

// Create a payment
router.post('/create-payment', paymentController.createPayment);

// Verify payment
router.post('/verify-payment', paymentController.verifyPayment);

// Process refund
router.post('/process-refund', paymentController.processRefund);

module.exports = router;
