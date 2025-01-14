const express = require('express');
const router = express.Router();
const { getUserList, assignRole, updateUser, deleteUser, createUser } = require('../controllers/userController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');
const validateRequest = require('../utils/validationMiddleware');

// Validation schema for updating a user
const updateUserValidation = {
  name: 'required|string',
  email: 'required|string',
  roleId: 'required|integer',
};

// Validation schema for deleting a user
const deleteUserValidation = {
  userId: 'required|integer',
};

// Validation schema for creating a user
const createUserValidation = {
  name: 'required|string',
  email: 'required|string',
  password: 'required|string',
  role: 'required|string|in:admin,store_admin,customer'
};

// Create a new user
router.post('/create', authenticate, isAdmin, validateRequest(createUserValidation), createUser);

// Get user list with pagination (Admin only)
router.get('/users', isAdmin, async (req, res) => {
  try {
    // Extract and validate query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Page and limit must be positive integers' });
    }

    // Pass the processed data to the controller
    const response = await getUserList({ page, limit });

    res.status(200).json(response);
  } catch (error) {
    console.error('Error in route:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Assign role to a user
router.patch('/assign-role', authenticate, isAdmin, assignRole);

// Update User
router.put('/users/:id', authenticate, validateRequest(updateUserValidation), async (req, res) => {
  try {
    const result = await updateUser(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete User
router.delete('/users/:id', authenticate, validateRequest(deleteUserValidation), async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
