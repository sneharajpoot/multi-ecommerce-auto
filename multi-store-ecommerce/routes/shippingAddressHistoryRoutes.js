const express = require('express');
const router = express.Router();
const shippingAddressHistoryController = require('../controllers/shippingAddressHistoryController');
const { authenticate } = require('../middlewares/authMiddleware');

 
/**
 * @swagger
 * /api/shipping-address-histories/{id}:
 *   get:
 *     summary: Get a shipping address history by ID
 *     tags: [Shipping Address Histories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shipping address history
 *     responses:
 *       200:
 *         description: Shipping address history details
 *       404:
 *         description: Shipping address history not found
 *       500:
 *         description: Internal server error
 */
router.get('/:customer_id', authenticate, shippingAddressHistoryController.getShippingAddressHistoryById);

/**
 * @swagger
 * /api/shipping-address-histories:
 *   post:
 *     summary: Add a new shipping address history
 *     tags: [Shipping Address Histories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *               orderId:
 *                 type: integer
 *               addressLine1:
 *                 type: string
 *               addressLine2:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               country:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       201:
 *         description: Shipping address history added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/:customer_id', authenticate, shippingAddressHistoryController.addShippingAddressHistory);

/**
 * @swagger
 * /api/shipping-address-histories/{id}:
 *   put:
 *     summary: Update a shipping address history
 *     tags: [Shipping Address Histories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shipping address history
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addressLine1:
 *                 type: string
 *               addressLine2:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               country:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       200:
 *         description: Shipping address history updated successfully
 *       404:
 *         description: Shipping address history not found
 *       500:
 *         description: Internal server error
 */
router.put('/:customer_id', authenticate, shippingAddressHistoryController.updateShippingAddressHistory);

/**
 * @swagger
 * /api/shipping-address-histories/{id}:
 *   delete:
 *     summary: Delete a shipping address history
 *     tags: [Shipping Address Histories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shipping address history
 *     responses:
 *       200:
 *         description: Shipping address history deleted successfully
 *       404:
 *         description: Shipping address history not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, shippingAddressHistoryController.deleteShippingAddressHistory);

module.exports = router;
