const express = require('express');
const router = express.Router();
const taxRuleController = require('../controllers/taxRuleController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize('admin', 'store_admin'), taxRuleController.createTaxRule);
router.get('/', authenticate, authorize('admin', 'store_admin'), taxRuleController.getTaxRules);
router.patch('/:id', authenticate, authorize('admin', 'store_admin'), taxRuleController.updateTaxRule);
router.delete('/:id', authenticate, authorize('admin'), taxRuleController.deleteTaxRule);

module.exports = router;
