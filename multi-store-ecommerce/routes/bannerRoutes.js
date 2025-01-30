const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Middleware for handling file uploads

// Add a new banner image
router.post('/', authenticate, authorize('admin'), upload.single('image'), bannerController.addBannerImage);

// Update an existing banner image
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), bannerController.updateBannerImage);

// ...existing code...

module.exports = router;
