// File: routes/bulkUploadLogRoutes.js

const express = require('express');
const router = express.Router();
const bulkUploadLogController = require('../controllers/bulkUploadLogController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

// Create Bulk Upload Log
router.post('/', authenticate, isAdmin, bulkUploadLogController.createBulkUploadLog);

// Get Bulk Upload Logs
router.get('/', authenticate, isAdmin, bulkUploadLogController.getBulkUploadLogs);

// Update Bulk Upload Log
router.patch('/:id', authenticate, isAdmin, bulkUploadLogController.updateBulkUploadLog);

// Delete Bulk Upload Log
router.delete('/:id', authenticate, isAdmin, bulkUploadLogController.deleteBulkUploadLog);

module.exports = router;
