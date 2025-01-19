const express = require('express');
const router = express.Router();
const { createRolePermission, getAllRolePermissions, getRolePermissionById, updateRolePermission, deleteRolePermission } = require('../controllers/rolePermissionController');
const validateRequest = require('../utils/validationMiddleware');

// Validation schema for RolePermission
const rolePermissionValidation = {
  roleId: 'required|string',
  permissionId: 'required|string',
};

/**
 * @swagger
 * /api/role-permissions:
 *   post:
 *     summary: Create a new role permission
 *     tags: [RolePermissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleId:
 *                 type: string
 *               permissionId:
 *                 type: string
 *     responses:
 *       201:
 *         description: RolePermission created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', validateRequest(rolePermissionValidation), createRolePermission);

/**
 * @swagger
 * /api/role-permissions:
 *   get:
 *     summary: Get all role permissions
 *     tags: [RolePermissions]
 *     responses:
 *       200:
 *         description: List of role permissions
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllRolePermissions);

/**
 * @swagger
 * /api/role-permissions/{id}:
 *   get:
 *     summary: Get a role permission by ID
 *     tags: [RolePermissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the role permission
 *     responses:
 *       200:
 *         description: RolePermission details
 *       404:
 *         description: RolePermission not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getRolePermissionById);

/**
 * @swagger
 * /api/role-permissions/{id}:
 *   put:
 *     summary: Update a role permission
 *     tags: [RolePermissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the role permission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleId:
 *                 type: string
 *               permissionId:
 *                 type: string
 *     responses:
 *       200:
 *         description: RolePermission updated successfully
 *       404:
 *         description: RolePermission not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', validateRequest(rolePermissionValidation), updateRolePermission);

/**
 * @swagger
 * /api/role-permissions/{id}:
 *   delete:
 *     summary: Delete a role permission
 *     tags: [RolePermissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the role permission
 *     responses:
 *       200:
 *         description: RolePermission deleted successfully
 *       404:
 *         description: RolePermission not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteRolePermission);

module.exports = router;
