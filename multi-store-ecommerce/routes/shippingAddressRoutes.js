const express = require('express');
const router = express.Router();
const shippingAddressController = require('../controllers/shippingAddressController');
const { authenticate } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/shipping-addresses:
 *   get:
 *     summary: Get all shipping addresses
 *     tags: [Shipping Addresses]
 *     responses:
 *       200:
 *         description: List of shipping addresses
 *       500:
 *         description: Internal server error
 */
router.get('/:customer_id', authenticate, shippingAddressController.getShippingAddresses);
 
/**
 * @swagger
 * /api/shipping-addresses:
 *   post:
 *     summary: Add a new shipping address
 *     tags: [Shipping Addresses]
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
 *         description: Shipping address added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/:customer_id', authenticate, shippingAddressController.addShippingAddress);

/**
 * @swagger
 * /api/shipping-addresses/{id}:
 *   put:
 *     summary: Update a shipping address
 *     tags: [Shipping Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shipping address
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
 *         description: Shipping address updated successfully
 *       404:
 *         description: Shipping address not found
 *       500:
 *         description: Internal server error
 */
router.put('/:address_id', authenticate, shippingAddressController.updateShippingAddress);

/**
 * @swagger
 * /api/shipping-addresses/{id}:
 *   delete:
 *     summary: Delete a shipping address
 *     tags: [Shipping Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shipping address
 *     responses:
 *       200:
 *         description: Shipping address deleted successfully
 *       404:
 *         description: Shipping address not found
 *       500:
 *         description: Internal server error
 *     links:
 *       DeleteShippingAddress:
 *         operationId: deleteShippingAddress
 *         parameters:
 *           id: $response.body#/id
 */
router.delete('/:id', authenticate, shippingAddressController.deleteShippingAddress);

module.exports = router;
