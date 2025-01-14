const express = require('express');
const router = express.Router();
const productMetadataController = require('../controllers/productMetadataController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize('admin', 'store_admin'), productMetadataController.addProductMetadata);
router.get('/:product_id', authenticate, authorize('admin', 'store_admin'), productMetadataController.getProductMetadata);
router.patch('/:id', authenticate, authorize('admin', 'store_admin'), productMetadataController.updateProductMetadata);
router.delete('/:id', authenticate, authorize('admin', 'store_admin'), productMetadataController.deleteProductMetadata);

module.exports = router;
