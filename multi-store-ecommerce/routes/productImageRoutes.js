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

/**
 * @swagger
 * /api/product-images/{productId}:
 *   post:
 *     summary: Add a new product image
 *     tags: [Product Images]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               isPrimary:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Product image added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/:productId', upload.single('images'), validateRequest(productImageValidation), addProductImage);

/**
 * @swagger
 * /api/product-images/{productId}:
 *   get:
 *     summary: Get all product images
 *     tags: [Product Images]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: List of product images
 *       500:
 *         description: Internal server error
 */
router.get('/:productId', getProductImages);

/**
 * @swagger
 * /api/product-images/{id}:
 *   put:
 *     summary: Update a product image
 *     tags: [Product Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isPrimary:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product image updated successfully
 *       500:
 *         description: Internal server error
 */
router.put('/:id', validateRequest(productImageValidation), updateProductImage);
router.patch('/setprimary/:productId/:id', setprimary);

/**
 * @swagger
 * /api/product-images/{id}:
 *   delete:
 *     summary: Delete a product image
 *     tags: [Product Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product image
 *     responses:
 *       200:
 *         description: Product image deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/:productId/:id', deleteProductImage);

// Route to view uploaded image
router.get('/view/:imageName', viewUploadedImage);

module.exports = router;
