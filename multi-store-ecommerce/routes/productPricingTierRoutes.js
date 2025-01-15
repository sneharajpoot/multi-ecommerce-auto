const express = require('express');
const router = express.Router();
const productPricingTierController = require('../controllers/productPricingTierController');
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
 *     ProductPricingTier:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         product_id:
 *           type: integer
 *         tier_name:
 *           type: string
 *         price:
 *           type: number
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
 * /api/product-pricing-tiers:
 *   post:
 *     summary: Add a new product pricing tier
 *     tags: [ProductPricingTiers]
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
 *               tier_name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product pricing tier added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductPricingTier'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, authorize('admin', 'store_admin'), productPricingTierController.addPricingTier);

/**
 * @swagger
 * /api/product-pricing-tiers/{product_id}:
 *   get:
 *     summary: Get product pricing tiers by product ID
 *     tags: [ProductPricingTiers]
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
 *         description: List of product pricing tiers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductPricingTier'
 *       404:
 *         description: Product pricing tiers not found
 *       500:
 *         description: Internal server error
 */
router.get('/:product_id', authenticate, authorize('admin', 'store_admin'), productPricingTierController.getPricingTiers);

/**
 * @swagger
 * /api/product-pricing-tiers/{id}:
 *   patch:
 *     summary: Update a product pricing tier by ID
 *     tags: [ProductPricingTiers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product pricing tier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tier_name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product pricing tier updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductPricingTier'
 *       404:
 *         description: Product pricing tier not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', authenticate, authorize('admin', 'store_admin'), productPricingTierController.updatePricingTier);

/**
 * @swagger
 * /api/product-pricing-tiers/{id}:
 *   delete:
 *     summary: Delete a product pricing tier by ID
 *     tags: [ProductPricingTiers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product pricing tier ID
 *     responses:
 *       200:
 *         description: Product pricing tier deleted successfully
 *       404:
 *         description: Product pricing tier not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, authorize('admin', 'store_admin'), productPricingTierController.deletePricingTier);

module.exports = router;
