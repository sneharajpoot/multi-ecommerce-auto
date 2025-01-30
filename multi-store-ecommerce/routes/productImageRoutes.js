const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addProductImage, getProductImages, updateProductImage, deleteProductImage, viewUploadedImage, setprimary } = require('../controllers/productImageController');
const validateRequest = require('../utils/validationMiddleware');

const upload = multer({ dest: 'uploads/' });

// Validation schema for ProductImage
const productImageValidation = {
  is_primary: 'boolean',
};

router.post('/:productId', upload.single('images'), validateRequest(productImageValidation), addProductImage);

router.get('/:productId', getProductImages);

router.put('/:id', validateRequest(productImageValidation), updateProductImage);
router.patch('/setprimary/:productId/:id', setprimary);

router.delete('/:productId/:id', deleteProductImage);

// Route to view uploaded image
router.get('/view/:imageName', viewUploadedImage);

module.exports = router;
