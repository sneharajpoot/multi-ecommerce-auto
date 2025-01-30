const multer = require('multer'); 
const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController'); // Adjust path as needed
const { authenticate, isAdmin } = require('../middlewares/authMiddleware'); // Middleware for authentication and admin check



const upload = multer({ dest: 'uploads/' });
const validateRequest = require('../utils/validationMiddleware');

// Validation schema for ProductImage
const productImageValidation = {
  is_primary: 'boolean',
};

 

// Create a new banner (Admin only)
router.post('/', authenticate, upload.single('image'), bannerController.createBanner);

// Get all active banners (Public route)
router.get('/', bannerController.getBanners);

// Update an existing banner (Admin only)
router.put('/:id', authenticate, upload.single('image'),  bannerController.updateBanner);

// Delete a banner (Admin only)
router.delete('/:id', authenticate, isAdmin, bannerController.deleteBanner);

module.exports = router;
