const express = require('express');
const router = express.Router();
const productAttributeController = require('../controllers/productAttributeController');
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
 *     ProductAttribute:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         product_id:
 *           type: integer
 *         attribute_name:
 *           type: string
 *         attribute_value:
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
 * /api/product-attributes:
 *   post:
 *     summary: Add a new product attribute
 *     tags: [ProductAttributes]
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
 *               attribute_name:
 *                 type: string
 *               attribute_value:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product attribute added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductAttribute'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/:productId', authenticate, authorize('admin', 'store_admin'), productAttributeController.addProductAttribute);

/**
 * @swagger
 * /api/product-attributes/{product_id}:
 *   get:
 *     summary: Get product attributes by product ID
 *     tags: [ProductAttributes]
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
 *         description: List of product attributes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductAttribute'
 *       404:
 *         description: Product attributes not found
 *       500:
 *         description: Internal server error
 */
router.get('/:productId', authenticate, authorize('admin', 'store_admin'), productAttributeController.getProductAttributes);

/**
 * @swagger
 * /api/product-attributes/{id}:
 *   patch:
 *     summary: Update a product attribute by ID
 *     tags: [ProductAttributes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product attribute ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attribute_name:
 *                 type: string
 *               attribute_value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product attribute updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductAttribute'
 *       404:
 *         description: Product attribute not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:productId/:id', authenticate, authorize('admin', 'store_admin'), productAttributeController.updateProductAttribute);

/**
 * @swagger
 * /api/product-attributes/{id}:
 *   delete:
 *     summary: Delete a product attribute by ID
 *     tags: [ProductAttributes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product attribute ID
 *     responses:
 *       200:
 *         description: Product attribute deleted successfully
 *       404:
 *         description: Product attribute not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:productId/:id', authenticate, authorize('admin', 'store_admin'), productAttributeController.deleteProductAttribute);

module.exports = router;
