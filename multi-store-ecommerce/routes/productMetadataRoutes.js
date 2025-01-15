const express = require('express');
const router = express.Router();
const productMetadataController = require('../controllers/productMetadataController');
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
 *     ProductMetadata:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         product_id:
 *           type: integer
 *         key:
 *           type: string
 *         value:
 *           type: string
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
 * /api/product-metadata:
 *   post:
 *     summary: Add new product metadata
 *     tags: [ProductMetadata]
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
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product metadata added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductMetadata'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, authorize('admin', 'store_admin'), productMetadataController.addProductMetadata);

/**
 * @swagger
 * /api/product-metadata/{product_id}:
 *   get:
 *     summary: Get product metadata by product ID
 *     tags: [ProductMetadata]
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
 *         description: List of product metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductMetadata'
 *       404:
 *         description: Product metadata not found
 *       500:
 *         description: Internal server error
 */
router.get('/:product_id', authenticate, authorize('admin', 'store_admin'), productMetadataController.getProductMetadata);

/**
 * @swagger
 * /api/product-metadata/{id}:
 *   patch:
 *     summary: Update product metadata by ID
 *     tags: [ProductMetadata]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product metadata ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product metadata updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductMetadata'
 *       404:
 *         description: Product metadata not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', authenticate, authorize('admin', 'store_admin'), productMetadataController.updateProductMetadata);

/**
 * @swagger
 * /api/product-metadata/{id}:
 *   delete:
 *     summary: Delete product metadata by ID
 *     tags: [ProductMetadata]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product metadata ID
 *     responses:
 *       200:
 *         description: Product metadata deleted successfully
 *       404:
 *         description: Product metadata not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, authorize('admin', 'store_admin'), productMetadataController.deleteProductMetadata);

module.exports = router;
