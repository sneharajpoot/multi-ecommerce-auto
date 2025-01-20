const express = require('express');
const router = express.Router();
const productTagController = require('../controllers/productTagController');
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
 *     ProductTag:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         product_id:
 *           type: integer
 *         tag:
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
 * /api/product-tags:
 *   post:
 *     summary: Add a new product tag
 *     tags: [ProductTags]
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
 *               tag:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product tag added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductTag'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, productTagController.addProductTag);

/**
 * @swagger
 * /api/product-tags:
 *   get:
 *     summary: Get all product tags
 *     tags: [Product Tags]
 *     responses:
 *       200:
 *         description: List of product tags
 *       500:
 *         description: Internal server error
 */
router.get('/', productTagController.getProductTags);

/**
 * @swagger
 * /api/product-tags/{product_id}:
 *   get:
 *     summary: Get product tags by product ID
 *     tags: [ProductTags]
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
 *         description: List of product tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductTag'
 *       404:
 *         description: Product tags not found
 *       500:
 *         description: Internal server error
 */
router.get('/:product_id', authenticate, productTagController.getProductTags);

/**
 * @swagger
 * /api/product-tags/{id}:
 *   delete:
 *     summary: Delete a product tag by ID
 *     tags: [ProductTags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product tag ID
 *     responses:
 *       200:
 *         description: Product tag deleted successfully
 *       404:
 *         description: Product tag not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, productTagController.deleteProductTag);

module.exports = router;
