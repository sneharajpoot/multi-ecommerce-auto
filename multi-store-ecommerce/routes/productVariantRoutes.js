const express = require('express');
const router = express.Router();
const productVariantController = require('../controllers/productVariantController');
const { authenticate } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/product-variants:
 *   get:
 *     summary: Get all product variants
 *     tags: [Product Variants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of product variants
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticate, productVariantController.getProductVariants);

/**
 * @swagger
 * /api/product-variants:
 *   post:
 *     summary: Add a new product variant
 *     tags: [Product Variants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               sku:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product variant added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/:productId', authenticate, productVariantController.addOrUpdateProductVariants);

/**
 * @swagger
 * /api/product-variants/{id}:
 *   put:
 *     summary: Update a product variant
 *     tags: [Product Variants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product variant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               sku:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product variant updated successfully
 *       404:
 *         description: Product variant not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticate, productVariantController.updateProductVariant);

/**
 * @swagger
 * /api/product-variants/{id}:
 *   delete:
 *     summary: Delete a product variant
 *     tags: [Product Variants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product variant
 *     responses:
 *       200:
 *         description: Product variant deleted successfully
 *       404:
 *         description: Product variant not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, productVariantController.deleteProductVariant);

module.exports = router;