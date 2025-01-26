const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all cart items
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart items
 *       500:
 *         description: Internal server error
 */
router.get('/:customer_id', authenticate, cartController.getCartItems);
router.get('/:customer_id/detail', authenticate, cartController.getCartItemsDetail);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add a new cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               qty:
 *                 type: integer
 *               variant_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cart item added successfully
 *       500:
 *         description: Internal server error
 */
router.put('/:customer_id', authenticate, cartController.addAndUpdateCartItem);
router.put('/:customer_id/:cart_id', authenticate, cartController.updateCartItemCount);

/**
 * @swagger
 * /api/cart/{id}:
 *   put:
 *     summary: Update a cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cart item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               qty:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', authenticate, cartController.updateCartItem);

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Delete a cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cart item
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, cartController.deleteCartItem);

module.exports = router;