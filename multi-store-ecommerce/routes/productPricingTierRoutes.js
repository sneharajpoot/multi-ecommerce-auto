const express = require('express');
const router = express.Router();
const productPricingTierController = require('../controllers/productPricingTierController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize('admin', 'store_admin'), productPricingTierController.addPricingTier);
router.get('/:product_id', authenticate, authorize('admin', 'store_admin'), productPricingTierController.getPricingTiers);
router.patch('/:id', authenticate, authorize('admin', 'store_admin'), productPricingTierController.updatePricingTier);
router.delete('/:id', authenticate, authorize('admin', 'store_admin'), productPricingTierController.deletePricingTier);

module.exports = router;
