const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

router.post('/api/categories', authenticate, isAdmin, categoryController.createCategory);

router.get('/api/categories', authenticate, isAdmin, categoryController.getAllCategories);

router.get('/api/categories/:id', authenticate, isAdmin, categoryController.getCategoryById);

router.put('/api/categories/:id', authenticate, isAdmin, categoryController.updateCategory);

router.delete('/api/categories/:id', authenticate, isAdmin, categoryController.deleteCategory);

module.exports = router;
