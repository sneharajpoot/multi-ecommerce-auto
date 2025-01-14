const express = require('express');
const router = express.Router();
const shippingClassController = require('../controllers/shippingClassController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', authenticate, isAdmin, shippingClassController.createShippingClass);
router.get('/', authenticate, isAdmin, shippingClassController.getShippingClasses);
router.patch('/:id', authenticate, isAdmin, shippingClassController.updateShippingClass);
router.delete('/:id', authenticate, isAdmin, shippingClassController.deleteShippingClass);

module.exports = router;
