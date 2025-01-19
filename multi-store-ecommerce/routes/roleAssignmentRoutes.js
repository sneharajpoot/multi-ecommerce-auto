const express = require('express');
const router = express.Router();
const { assignRoleToUser, getUserRolesByUserId, removeUserRole } = require('../controllers/roleAssignmentController');
const validateRequest = require('../utils/validationMiddleware');

// Validation schema for RoleAssignment
const roleAssignmentValidation = {
  userId: 'required|string',
  roleId: 'required|string',
};

/**
 * @swagger
 * /api/role-assignments:
 *   post:
 *     summary: Assign a role to a user
 *     tags: [RoleAssignments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               roleId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role assigned successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', validateRequest(roleAssignmentValidation), assignRoleToUser);

/**
 * @swagger
 * /api/role-assignments/user-roles/{userId}:
 *   get:
 *     summary: Get roles assigned to a user
 *     tags: [RoleAssignments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: List of roles assigned to the user
 *       500:
 *         description: Internal server error
 */
router.get('/user-roles/:userId', getUserRolesByUserId);

/**
 * @swagger
 * /api/role-assignments:
 *   delete:
 *     summary: Remove a role from a user
 *     tags: [RoleAssignments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               roleId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role removed successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/', validateRequest(roleAssignmentValidation), removeUserRole);

module.exports = router;
