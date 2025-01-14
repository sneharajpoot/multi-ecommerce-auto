const express = require('express');
const router = express.Router();
const productAttributeController = require('../controllers/productAttributeController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize('admin', 'store_admin'), productAttributeController.addProductAttribute);
router.get('/:product_id', authenticate, authorize('admin', 'store_admin'), productAttributeController.getProductAttributes);
router.patch('/:id', authenticate, authorize('admin', 'store_admin'), productAttributeController.updateProductAttribute);
router.delete('/:id', authenticate, authorize('admin', 'store_admin'), productAttributeController.deleteProductAttribute);

module.exports = router;
