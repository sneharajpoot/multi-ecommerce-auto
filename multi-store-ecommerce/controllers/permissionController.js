const db = require('../models'); // Correct path to models
const { Permissions } = db;

// Create Permission
exports.createPermission = async (req, res) => {
  const { action, description } = req.body;

  try {
    const newPermission = await Permissions.create({ action, description });
    res.status(201).json({ message: 'Permission created successfully', permission: newPermission });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Get All Permissions
exports.listPermissions = async (req, res) => {
  try {
    const permissions = await Permissions.findAll();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Get Permission by ID
exports.getPermissionById = async (req, res) => {
  const { id } = req.params;

  try {
    const permission = await Permissions.findByPk(id);
    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Update Permission
exports.updatePermission = async (req, res) => {
  const { id } = req.params;
  const { action, description } = req.body;

  try {
    const permission = await Permissions.findByPk(id);
    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }

    permission.action = action;
    permission.description = description;
    await permission.save();

    res.status(200).json({ message: 'Permission updated successfully', permission });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Delete Permission
exports.deletePermission = async (req, res) => {
  const { id } = req.params;

  try {
    const permission = await Permissions.findByPk(id);
    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }

    await permission.destroy();
    res.status(200).json({ message: 'Permission deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
