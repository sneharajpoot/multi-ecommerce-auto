const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', authenticate, isAdmin, roleController.createRole);
router.get('/', authenticate, isAdmin, roleController.getRoles);
router.patch('/:id', authenticate, isAdmin, roleController.updateRole);
router.delete('/:id', authenticate, isAdmin, roleController.deleteRole);

module.exports = router;
