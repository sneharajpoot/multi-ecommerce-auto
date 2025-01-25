const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate, authorizeAdmin, authorize } = require('../middlewares/authMiddleware');
  
router.get('/lists', orderController.getOrders);
router.get('/status/lists', orderController.getStatusList);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get('/list', authenticate, orderController.getCustomerOrderById);

router.get('/detail/:order_id', authenticate, orderController.getOrderByOrderId);
// only for admin

router.get('/complete/detail/:order_id', authenticate, authorize('admin', 'store_admin'), orderController.getOrderByOrderIdAdmin);

// New route for updating order status by admin
// router.patch('/status/:order_id', authenticate, authorize('admin', 'store_admin'), authorizeAdmin, orderController.updateOrderStatus);

// New route for getting order history by order ID
// router.get('/history/:order_id', authenticate, authorize('admin', 'store_admin'), orderController.getOrderHistoryByOrderId);

// New route for getting list of order statuses
// router.get('/statuses', authenticate, authorize('admin', 'store_admin'), orderController.getOrderStatuses);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Add a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *               storeId:
 *                 type: integer
 *               totalAmount:
 *                 type: number
 *               status:
 *                 type: string
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   addressLine1:
 *                     type: string
 *                   addressLine2:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *                   country:
 *                     type: string
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     variantId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *     responses:
 *       201:
 *         description: Order added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, orderController.addOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *               storeId:
 *                 type: integer
 *               totalAmount:
 *                 type: number
 *               status:
 *                 type: string
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   addressLine1:
 *                     type: string
 *                   addressLine2:
 *                     type: string
 *                   city:
 *                     type: string
 *                     state:
 *                     type: string
 *                     postalCode:
 *                     type: string
 *                     country:
 *                     type: string
 *                     latitude:
 *                     type: number
 *                     longitude:
 *                     type: number
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     variantId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticate, orderController.updateOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, orderController.deleteOrder);
 
module.exports = router;
