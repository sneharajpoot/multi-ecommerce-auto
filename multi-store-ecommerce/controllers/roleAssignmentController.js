const db = require('../config/db');

/**
 * Assign a role to a user
 * @param {Object} data - Role assignment data
 */
const assignRoleToUser = async (data) => {
  const { userId, roleId } = data;

  try {
    const [existing] = await db.query(
      'SELECT * FROM UserRoles WHERE userId = ? AND roleId = ?',
      [userId, roleId]
    );

    if (existing) {
      throw new Error('User already has this role assigned');
    }

    await db.query(
      'INSERT INTO UserRoles (userId, roleId, createdAt) VALUES (?, ?, NOW())',
      [userId, roleId]
    );

    return { message: 'Role assigned successfully', userId, roleId };
  } catch (error) {
    console.error('Error assigning role:', error.message);
    throw error;
  }
};

/**
 * Get roles assigned to a user
 * @param {Number} userId - User ID
 */
const getUserRoles = async (userId) => {
  try {
    const roles = await db.query(
      `
      SELECT r.id AS roleId, r.roleName, r.description
      FROM UserRoles ur
      JOIN Roles r ON ur.roleId = r.id
      WHERE ur.userId = ?
      `,
      [userId]
    );

    return roles;
  } catch (error) {
    console.error('Error retrieving user roles:', error.message);
    throw error;
  }
};

/**
 * Get user roles, associated modules, and permissions by user ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

/ controllers/userRolesController.js
const db = require('../models'); // Sequelize models

/**
 * Fetch roles, modules, and permissions for a specific user ID.
 * @param {number} userId - User ID to fetch roles and permissions for
 * @returns {Promise<Object>} - Returns roles and permissions data
 */
const getUserRolesByUserId = async (userId) => {
  const userRolesWithPermissions = await db.sequelize.query(
    `
    SELECT 
        ur.userId,
        r.id AS roleId,
        r.roleName AS roleName,
        r.description AS roleDescription,
        m.id AS moduleId,
        m.name AS moduleName,
        m.description AS moduleDescription,
        p.id AS permissionId,
        p.action AS permissionAction,
        p.description AS permissionDescription
    FROM 
        UserRoles ur
    JOIN 
        Roles r ON ur.roleId = r.id
    JOIN 
        RolePermissions rp ON rp.roleId = r.id
    JOIN 
        Modules m ON rp.moduleId = m.id
    JOIN 
        Permissions p ON rp.permissionId = p.id
    WHERE 
        ur.userId = :userId
    `,
    {
      replacements: { userId: userId },
      type: db.Sequelize.QueryTypes.SELECT,
    }
  );

  if (!userRolesWithPermissions || userRolesWithPermissions.length === 0) {
    const error = new Error('No roles or permissions found for this user ID');
    error.status = 404;
    throw error;
  }

  return userRolesWithPermissions;
};
 


/**
 * Remove a role from a user
 * @param {Object} data - Role removal data
 */
const removeUserRole = async (data) => {
  const { userId, roleId } = data;

  try {
    await db.query(
      'DELETE FROM UserRoles WHERE userId = ? AND roleId = ?',
      [userId, roleId]
    );

    return { message: 'Role removed successfully', userId, roleId };
  } catch (error) {
    console.error('Error removing role:', error.message);
    throw error;
  }
};

module.exports = {
  assignRoleToUser,
  getUserRoles,
  removeUserRole,
  getUserRolesByUserId,
};
