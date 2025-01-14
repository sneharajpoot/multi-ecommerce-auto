// add comment here


const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');
const { authenticate, authorize } = require('../middleware/auth'); // Ensure correct import

// Create a new product
router.post('/', authenticate, authorize('store_admin'), productController.createProduct);

// Get a list of products
router.get('/', productController.listProducts);

// Get a single product by ID
router.get('/:product_id', productController.getProductById);

// Update a product by ID
router.patch('/:product_id', authenticate, authorize('store_admin'), productController.updateProduct);

// Delete a product by ID
router.delete('/:product_id', authenticate, authorize('store_admin'), productController.deleteProduct);

module.exports = router;