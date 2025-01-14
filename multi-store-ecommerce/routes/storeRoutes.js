// routes/storeRoutes.js

const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { authenticate, authorize } = require('../middleware/auth'); // Corrected path

// Register a new store by store admin
router.post('/register', authenticate, authorize('store_admin'), storeController.registerStore);

// Activate a store by admin
router.patch('/:store_id/activate', authenticate, authorize('admin'), storeController.activateStore);

// Deactivate a store by admin
router.patch('/:store_id/deactivate', authenticate, authorize('admin'), storeController.deactivateStore);

// Get store details
router.get('/:store_id', authenticate, authorize('store_admin', 'customer'), storeController.getStoreDetails);

// Approve a store by admin
router.patch('/:store_id/approve', authenticate, authorize('admin'), storeController.approveStore);

module.exports = router;
