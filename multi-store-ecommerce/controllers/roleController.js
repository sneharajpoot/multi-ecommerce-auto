const db = require('../models');
const { Role } = db;

/**
 * Create a new role
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const createRole = async (req, res) => {
  try {
    const { roleName, description } = req.body;
    const role = await Role.create({ roleName, description });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get all roles
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get role by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update role by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleName, description } = req.body;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    role.roleName = roleName;
    role.description = description;
    await role.save();
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete role by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    await role.destroy();
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Assign permissions to a role
 * @param {Object} data - Role and permission mapping
 */
const assignPermissionToRole = async (data) => {
  const { roleId, moduleId, permissionId } = data;
  try {
    await db.query(
      'INSERT INTO RolePermissions (roleId, moduleId, permissionId, createdAt) VALUES (?, ?, ?, NOW())',
      [roleId, moduleId, permissionId]
    );
    return { message: 'Permission assigned successfully' };
  } catch (error) {
    console.error('Error assigning permission:', error.message);
    throw new Error('Failed to assign permission');
  }
};

/**
 * List roles with assigned permissions
 */
const listRolesWithPermissions = async () => {
  try {
    const roles = await db.query(`
      SELECT r.id AS roleId, r.roleName, rp.moduleId, rp.permissionId, p.action AS permissionAction
      FROM Roles r
      LEFT JOIN RolePermissions rp ON r.id = rp.roleId
      LEFT JOIN Permissions p ON rp.permissionId = p.id
    `);
    return roles;
  } catch (error) {
    console.error('Error listing roles with permissions:', error.message);
    throw new Error('Failed to retrieve roles and permissions');
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  assignPermissionToRole,
  listRolesWithPermissions,
};
