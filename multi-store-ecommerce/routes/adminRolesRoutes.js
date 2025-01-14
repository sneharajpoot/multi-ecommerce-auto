const express = require('express');
const rolesController = require('../controllers/rolesController');
const permissionsController = require('../controllers/permissionsController');
const rolePermissionsController = require('../controllers/rolePermissionsController');
const modulesController = require('../controllers/modulesController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Middleware to check if the user is an admin
router.use(authMiddleware.verifyToken); // Verify JWT
router.use(authMiddleware.isAdmin); // Ensure the user is an Admin

// Roles APIs
router.post('/roles', rolesController.createRole);
router.get('/roles', rolesController.getAllRoles);
router.get('/roles/:roleId', rolesController.getRoleById);
router.put('/roles/:roleId', rolesController.updateRole);
router.delete('/roles/:roleId', rolesController.deleteRole);

// Permissions APIs
router.post('/permissions', permissionsController.createPermission);
router.get('/permissions', permissionsController.getAllPermissions);
router.get('/permissions/:permissionId', permissionsController.getPermissionById);
router.put('/permissions/:permissionId', permissionsController.updatePermission);
router.delete('/permissions/:permissionId', permissionsController.deletePermission);

// Modules APIs
router.post('/modules', modulesController.createModule);
router.get('/modules', modulesController.getAllModules);
router.get('/modules/:moduleId', modulesController.getModuleById);
router.put('/modules/:moduleId', modulesController.updateModule);
router.delete('/modules/:moduleId', modulesController.deleteModule);

// RolePermissions APIs
router.post('/role-permissions', rolePermissionsController.assignPermissionToRole);
router.get('/role-permissions/:roleId', rolePermissionsController.getPermissionsByRole);
router.delete('/role-permissions', rolePermissionsController.removePermissionFromRole);

module.exports = router;
