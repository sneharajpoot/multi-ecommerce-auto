const express = require('express');
const router = express.Router();
const orderStatusHistoryController = require('../controllers/OrderStatusHistoryController');
const { authenticate, authorizeAdmin, authorize } = require('../middlewares/authMiddleware');
   
router.patch('/status/:order_id', authenticate, authorize('admin', 'store_admin'), authorizeAdmin, orderStatusHistoryController.updateOrderStatus);
 
// New route for getting order history by order ID
router.get('/history/:order_id', authenticate, authorize('admin', 'store_admin'), orderStatusHistoryController.getOrderHistoryByOrderId);

// New route for getting list of order statuses
router.get('/statuses', authenticate, authorize('admin', 'store_admin'), orderStatusHistoryController.getStatusList);
module.exports = router;
 