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

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/api/users/create', authenticate, isAdmin, validateRequest(createUserValidation), createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get user list with pagination (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: User list retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/api/users', isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Page and limit must be positive integers' });
    }

    const response = await getUserList({ page, limit });

    res.status(200).json(response);
  } catch (error) {
    console.error('Error in route:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users/assign-role:
 *   patch:
 *     summary: Assign role to a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               roleId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Role assigned successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.patch('/api/users/assign-role', authenticate, isAdmin, assignRole);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               roleId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.put('/api/users/:id', authenticate, validateRequest(updateUserValidation), async (req, res) => {
  try {
    const result = await updateUser(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.delete('/api/users/:id', authenticate, validateRequest(deleteUserValidation), async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
