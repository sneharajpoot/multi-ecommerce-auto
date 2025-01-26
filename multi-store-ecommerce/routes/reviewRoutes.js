const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController'); 

 
// Add a new review for a product
router.post('/product/:product_id/reviews', reviewController.addReview);

// Get all reviews for a product
router.get('/product/:product_id/reviews', reviewController.getReviewsByProduct);

module.exports = router;
