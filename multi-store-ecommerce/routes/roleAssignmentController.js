const express = require('express');
const router = express.Router();
const {
  assignRoleToUser,
  getUserRolesByUserId,
  removeUserRole,
} = require('../controllers/roleAssignmentController');

/**
 * Assign a role to a user
 */
router.post('/assign-role', async (req, res) => {
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
 * Get roles assigned to a user
 */

/**
 * Route to fetch roles and permissions for a specific user by userId.
 * GET /user-roles/:userId
 */
router.get('/user-roles/:userId', async (req, res) => {
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
 * Remove a role from a user
 */
router.delete('/remove-role', async (req, res) => {
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
