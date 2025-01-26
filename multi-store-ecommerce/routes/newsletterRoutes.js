const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');

// Subscribe to the newsletter
router.post('/subscribe', newsletterController.subscribe);

// Get all subscriptions
router.get('/', newsletterController.getSubscriptions);

// Unsubscribe from the newsletter
router.patch('/unsubscribe/:id', newsletterController.unsubscribe);

module.exports = router;
