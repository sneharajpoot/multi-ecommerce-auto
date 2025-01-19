const db = require('../models'); // Correct path to models
const { RoleAssignment } = db;

// Assign a role to a user
exports.assignRoleToUser = async (req, res) => {
  const { userId, roleId } = req.body;

  try {
    const newRoleAssignment = await RoleAssignment.create({ userId, roleId });
    res.status(201).json({ message: 'Role assigned successfully', roleAssignment: newRoleAssignment });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Get roles assigned to a user
exports.getUserRolesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const userRoles = await RoleAssignment.findAll({ where: { userId } });
    res.status(200).json(userRoles);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Remove a role from a user
exports.removeUserRole = async (req, res) => {
  const { userId, roleId } = req.body;

  try {
    const roleAssignment = await RoleAssignment.findOne({ where: { userId, roleId } });
    if (!roleAssignment) {
      return res.status(404).json({ error: 'Role assignment not found' });
    }

    await roleAssignment.destroy();
    res.status(200).json({ message: 'Role removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

