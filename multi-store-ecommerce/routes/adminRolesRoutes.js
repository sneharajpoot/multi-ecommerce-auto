const express = require('express');
const rolesController = require('../controllers/rolesController');
const permissionsController = require('../controllers/permissionsController');
const rolePermissionsController = require('../controllers/rolePermissionsController');
const modulesController = require('../controllers/modulesController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * security:
 *   - bearerAuth: []
 */

// Middleware to check if the user is an admin
router.use(authMiddleware.verifyToken); // Verify JWT
router.use(authMiddleware.isAdmin); // Ensure the user is an Admin

// Roles APIs
/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
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
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/roles', rolesController.createRole);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get a list of roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       500:
 *         description: Internal server error
 */
router.get('/roles', rolesController.getAllRoles);

/**
 * @swagger
 * /api/roles/{roleId}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.get('/roles/:roleId', rolesController.getRoleById);

/**
 * @swagger
 * /api/roles/{roleId}:
 *   put:
 *     summary: Update a role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.put('/roles/:roleId', rolesController.updateRole);

/**
 * @swagger
 * /api/roles/{roleId}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.delete('/roles/:roleId', rolesController.deleteRole);

// Permissions APIs
/**
 * @swagger
 * /api/permissions:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
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
 *     responses:
 *       201:
 *         description: Permission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/permissions', permissionsController.createPermission);

/**
 * @swagger
 * /api/permissions:
 *   get:
 *     summary: Get a list of permissions
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 *       500:
 *         description: Internal server error
 */
router.get('/permissions', permissionsController.getAllPermissions);

/**
 * @swagger
 * /api/permissions/{permissionId}:
 *   get:
 *     summary: Get a permission by ID
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permissionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Permission ID
 *     responses:
 *       200:
 *         description: Permission details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Internal server error
 */
router.get('/permissions/:permissionId', permissionsController.getPermissionById);

/**
 * @swagger
 * /api/permissions/{permissionId}:
 *   put:
 *     summary: Update a permission by ID
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permissionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Permission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Internal server error
 */
router.put('/permissions/:permissionId', permissionsController.updatePermission);

/**
 * @swagger
 * /api/permissions/{permissionId}:
 *   delete:
 *     summary: Delete a permission by ID
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permissionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Permission ID
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Internal server error
 */
router.delete('/permissions/:permissionId', permissionsController.deletePermission);

// Modules APIs
/**
 * @swagger
 * /api/modules:
 *   post:
 *     summary: Create a new module
 *     tags: [Modules]
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
 *     responses:
 *       201:
 *         description: Module created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Module'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/modules', modulesController.createModule);

/**
 * @swagger
 * /api/modules:
 *   get:
 *     summary: Get a list of modules
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of modules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Module'
 *       500:
 *         description: Internal server error
 */
router.get('/modules', modulesController.getAllModules);

/**
 * @swagger
 * /api/modules/{moduleId}:
 *   get:
 *     summary: Get a module by ID
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Module ID
 *     responses:
 *       200:
 *         description: Module details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Module'
 *       404:
 *         description: Module not found
 *       500:
 *         description: Internal server error
 */
router.get('/modules/:moduleId', modulesController.getModuleById);

/**
 * @swagger
 * /api/modules/{moduleId}:
 *   put:
 *     summary: Update a module by ID
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Module ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Module updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Module'
 *       404:
 *         description: Module not found
 *       500:
 *         description: Internal server error
 */
router.put('/modules/:moduleId', modulesController.updateModule);

/**
 * @swagger
 * /api/modules/{moduleId}:
 *   delete:
 *     summary: Delete a module by ID
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Module ID
 *     responses:
 *       200:
 *         description: Module deleted successfully
 *       404:
 *         description: Module not found
 *       500:
 *         description: Internal server error
 */
router.delete('/modules/:moduleId', modulesController.deleteModule);

// RolePermissions APIs
/**
 * @swagger
 * /api/role-permissions:
 *   post:
 *     summary: Assign a permission to a role
 *     tags: [RolePermissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleId:
 *                 type: integer
 *               permissionId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Permission assigned to role successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/role-permissions', rolePermissionsController.assignPermissionToRole);

/**
 * @swagger
 * /api/role-permissions/{roleId}:
 *   get:
 *     summary: Get permissions by role ID
 *     tags: [RolePermissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Role ID
 *     responses:
 *       200:
 *         description: List of permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.get('/role-permissions/:roleId', rolePermissionsController.getPermissionsByRole);

/**
 * @swagger
 * /api/role-permissions:
 *   delete:
 *     summary: Remove a permission from a role
 *     tags: [RolePermissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleId:
 *                 type: integer
 *               permissionId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Permission removed from role successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.delete('/role-permissions', rolePermissionsController.removePermissionFromRole);

module.exports = router;
