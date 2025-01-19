const db = require('../models'); // Correct path to models
const { Roles } = db;

// Create Role
exports.createRole = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newRole = await Roles.create({ name, description });
    res.status(201).json({ message: 'Role created successfully', role: newRole });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Get All Roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Get Role by ID
exports.getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Roles.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Update Role
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const role = await Roles.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    role.name = name;
    role.description = description;
    await role.save();

    res.status(200).json({ message: 'Role updated successfully', role });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Delete Role
exports.deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Roles.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    await role.destroy();
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

/**
 * Assign permissions to a role
 * @param {Object} data - Role and permission mapping
 */
exports.assignPermissionToRole = async (data) => {
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
exports.listRolesWithPermissions = async () => {
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
 