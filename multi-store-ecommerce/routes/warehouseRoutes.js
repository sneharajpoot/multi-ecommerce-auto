// File: routes/warehouseRoutes.js

const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', authenticate, isAdmin, warehouseController.createWarehouse);
router.get('/', authenticate, isAdmin, warehouseController.getWarehouses);
router.patch('/:id', authenticate, isAdmin, warehouseController.updateWarehouse);
router.delete('/:id', authenticate, isAdmin, warehouseController.deleteWarehouse);

module.exports = router;
