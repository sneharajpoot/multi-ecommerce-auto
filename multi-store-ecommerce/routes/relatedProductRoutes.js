const express = require('express');
const router = express.Router();
const relatedProductController = require('../controllers/relatedProductController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize('admin', 'store_admin'), relatedProductController.addRelatedProduct);
router.get('/:product_id', authenticate, authorize('admin', 'store_admin'), relatedProductController.getRelatedProducts);
router.delete('/:id', authenticate, authorize('admin', 'store_admin'), relatedProductController.deleteRelatedProduct);

module.exports = router;
