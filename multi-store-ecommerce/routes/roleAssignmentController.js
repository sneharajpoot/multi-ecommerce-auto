const express = require('express');
const router = express.Router();
const {
  assignRoleToUser,
  getUserRolesByUserId,
  removeUserRole,
} = require('../controllers/roleAssignmentController');
const { authenticateAdmin } = require('../middleware/authenticateAdmin'); // Assuming you have this middleware

/**
 * @swagger
 * /assign-role:
 *   post:
 *     summary: Assign a role to a user (Admin only)
 *     tags: [Role Assignment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               roleId:
 *                 type: string
 *                 description: The ID of the role
 *     responses:
 *       200:
 *         description: Role assigned successfully
 *       400:
 *         description: userId and roleId are required
 *       500:
 *         description: Internal server error
 */
router.post('/assign-role', authenticateAdmin, async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    if (!userId || !roleId) {
      return res.status(400).json({ error: 'userId and roleId are required' });
    }

    const response = await assignRoleToUser({ userId, roleId });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /user-roles/{userId}:
 *   get:
 *     summary: Get roles assigned to a user (Admin only)
 *     tags: [Role Assignment]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A list of roles and permissions
 *       500:
 *         description: Internal server error
 */
router.get('/user-roles/:userId', authenticateAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const userRolesWithPermissions = await userRolesController.getUserRolesByUserId(userId);

    res.status(200).json({ data: userRolesWithPermissions });
  } catch (error) {
    console.error('Error fetching roles and permissions for user:', error);
    res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
  }
});

/**
 * @swagger
 * /remove-role:
 *   delete:
 *     summary: Remove a role from a user (Admin only)
 *     tags: [Role Assignment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               roleId:
 *                 type: string
 *                 description: The ID of the role
 *     responses:
 *       200:
 *         description: Role removed successfully
 *       400:
 *         description: userId and roleId are required
 *       500:
 *         description: Internal server error
 */
router.delete('/remove-role', authenticateAdmin, async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    if (!userId || !roleId) {
      return res.status(400).json({ error: 'userId and roleId are required' });
    }

    const response = await removeUserRole({ userId, roleId });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
