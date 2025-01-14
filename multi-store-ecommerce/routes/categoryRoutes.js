const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize('admin', 'store_admin'), categoryController.createCategory);
router.get('/', authenticate, authorize('admin', 'store_admin'), categoryController.getCategories);
router.patch('/:id', authenticate, authorize('admin', 'store_admin'), categoryController.updateCategory);
router.delete('/:id', authenticate, authorize('admin'), categoryController.deleteCategory);

module.exports = router;
 