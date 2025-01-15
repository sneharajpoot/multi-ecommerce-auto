const express = require('express');
const router = express.Router();
const productReviewController = require('../controllers/productReviewController');
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
 *     ProductReview:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         product_id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         rating:
 *           type: integer
 *         comment:
 *           type: string
 *         status:
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
 * /api/product-reviews:
 *   post:
 *     summary: Submit a product review
 *     tags: [ProductReviews]
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
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product review submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductReview'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, authorize('customer'), productReviewController.submitReview);

/**
 * @swagger
 * /api/product-reviews/{product_id}:
 *   get:
 *     summary: Get product reviews by product ID
 *     tags: [ProductReviews]
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
 *         description: List of product reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductReview'
 *       404:
 *         description: Product reviews not found
 *       500:
 *         description: Internal server error
 */
router.get('/:product_id', authenticate, authorize('admin', 'store_admin'), productReviewController.getProductReviews);

/**
 * @swagger
 * /api/product-reviews/{id}:
 *   patch:
 *     summary: Update the status of a product review by ID
 *     tags: [ProductReviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product review status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductReview'
 *       404:
 *         description: Product review not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', authenticate, authorize('admin', 'store_admin'), productReviewController.updateReviewStatus);

/**
 * @swagger
 * /api/product-reviews/{id}:
 *   delete:
 *     summary: Delete a product review by ID
 *     tags: [ProductReviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product review ID
 *     responses:
 *       200:
 *         description: Product review deleted successfully
 *       404:
 *         description: Product review not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, authorize('admin', 'store_admin'), productReviewController.deleteReview);

module.exports = router;
