const express = require('express');
const router = express.Router();
const orderStatusHistoryController = require('../controllers/OrderStatusHistoryController');
const { authenticate, authorizeAdmin, authorize } = require('../middlewares/authMiddleware');

router.patch('/status/:order_id', authenticate, authorize('admin', 'store_admin'), authorizeAdmin, orderStatusHistoryController.updateOrderStatus);
router.patch('/cancel/:order_id', authenticate,   authorizeAdmin, orderStatusHistoryController.cancelOrder);

// New route for getting order history by order ID
router.get('/history/:order_id', authenticate, authorize('admin', 'store_admin'), orderStatusHistoryController.getOrderHistoryByOrderId);

// New route for getting list of order statuses
router.get('/statuses', authenticate, authorize('admin', 'store_admin'), orderStatusHistoryController.getStatusList);

// New route for adding status history
router.post('/history/:order_id', authenticate, authorize('admin', 'store_admin'), orderStatusHistoryController.addOrderStatusHistory);

// New route for updating status history
// router.put('/history/:order_id', authenticate, authorize('admin', 'store_admin'), orderStatusHistoryController.updateOrderStatusHistory);

module.exports = router;
