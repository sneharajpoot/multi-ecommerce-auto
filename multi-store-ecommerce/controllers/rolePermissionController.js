const db = require('../models'); // Correct path to models
const { RolePermission } = db;

// Create RolePermission
exports.createRolePermission = async (req, res) => {
  const { roleId, permissionId } = req.body;

  try {
    const newRolePermission = await RolePermission.create({ roleId, permissionId });
    res.status(201).json({ message: 'RolePermission created successfully', rolePermission: newRolePermission });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Get All RolePermissions
exports.getAllRolePermissions = async (req, res) => {
  try {
    const rolePermissions = await RolePermission.findAll();
    res.status(200).json(rolePermissions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Get RolePermission by ID
exports.getRolePermissionById = async (req, res) => {
  const { id } = req.params;

  try {
    const rolePermission = await RolePermission.findByPk(id);
    if (!rolePermission) {
      return res.status(404).json({ error: 'RolePermission not found' });
    }
    res.status(200).json(rolePermission);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Update RolePermission
exports.updateRolePermission = async (req, res) => {
  const { id } = req.params;
  const { roleId, permissionId } = req.body;

  try {
    const rolePermission = await RolePermission.findByPk(id);
    if (!rolePermission) {
      return res.status(404).json({ error: 'RolePermission not found' });
    }

    rolePermission.roleId = roleId;
    rolePermission.permissionId = permissionId;
    await rolePermission.save();

    res.status(200).json({ message: 'RolePermission updated successfully', rolePermission });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Delete RolePermission
exports.deleteRolePermission = async (req, res) => {
  const { id } = req.params;

  try {
    const rolePermission = await RolePermission.findByPk(id);
    if (!rolePermission) {
      return res.status(404).json({ error: 'RolePermission not found' });
    }

    await rolePermission.destroy();
    res.status(200).json({ message: 'RolePermission deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
