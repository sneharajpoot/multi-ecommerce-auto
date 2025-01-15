const express = require('express');
const router = express.Router();
const relatedProductController = require('../controllers/relatedProductController');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     RelatedProduct:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         product_id:
 *           type: integer
 *         related_product_id:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /api/related-products:
 *   post:
 *     summary: Add a new related product
 *     tags: [RelatedProducts]
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
 *               related_product_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Related product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RelatedProduct'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, authorize('admin', 'store_admin'), relatedProductController.addRelatedProduct);

/**
 * @swagger
 * /api/related-products/{product_id}:
 *   get:
 *     summary: Get related products by product ID
 *     tags: [RelatedProducts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: List of related products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RelatedProduct'
 *       404:
 *         description: Related products not found
 *       500:
 *         description: Internal server error
 */
router.get('/:product_id', authenticate, authorize('admin', 'store_admin'), relatedProductController.getRelatedProducts);

/**
 * @swagger
 * /api/related-products/{id}:
 *   delete:
 *     summary: Delete a related product by ID
 *     tags: [RelatedProducts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Related product ID
 *     responses:
 *       200:
 *         description: Related product deleted successfully
 *       404:
 *         description: Related product not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, authorize('admin', 'store_admin'), relatedProductController.deleteRelatedProduct);

module.exports = router;
