const express = require('express');
const router = express.Router();
const productReviewController = require('../controllers/productReviewController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize('customer'), productReviewController.submitReview);
router.get('/:product_id', authenticate, authorize('admin', 'store_admin'), productReviewController.getProductReviews);
router.patch('/:id', authenticate, authorize('admin', 'store_admin'), productReviewController.updateReviewStatus);
router.delete('/:id', authenticate, authorize('admin', 'store_admin'), productReviewController.deleteReview);

module.exports = router;
