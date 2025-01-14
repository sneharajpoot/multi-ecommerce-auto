const express = require('express');
const router = express.Router();
const productTagController = require('../controllers/productTagController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize('admin', 'store_admin'), productTagController.addProductTag);
router.get('/:product_id', authenticate, authorize('admin', 'store_admin'), productTagController.getProductTags);
router.delete('/:id', authenticate, authorize('admin', 'store_admin'), productTagController.deleteProductTag);

module.exports = router;
