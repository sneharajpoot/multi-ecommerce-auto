const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize('admin', 'store_admin'), discountController.createDiscount);
router.get('/', authenticate, authorize('admin', 'store_admin'), discountController.getDiscounts);
router.patch('/:id', authenticate, authorize('admin', 'store_admin'), discountController.updateDiscount);
router.delete('/:id', authenticate, authorize('admin'), discountController.deleteDiscount);

module.exports = router;
