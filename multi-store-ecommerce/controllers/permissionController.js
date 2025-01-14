/**
 * Create a new permission
 * @param {Object} data - Permission data
 */
const createPermission = async (data) => {
    const { action, description } = data;
    try {
      const result = await db.query(
        'INSERT INTO Permissions (action, description, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())',
        [action, description]
      );
      return { id: result.insertId, action, description };
    } catch (error) {
      console.error('Error creating permission:', error.message);
      throw new Error('Failed to create permission');
    }
  };
  
  /**
   * Get a list of permissions
   */
  const listPermissions = async () => {
    try {
      const permissions = await db.query('SELECT * FROM Permissions');
      return permissions;
    } catch (error) {
      console.error('Error listing permissions:', error.message);
      throw new Error('Failed to retrieve permissions');
    }
  };
  
  /**
   * Update a permission
   * @param {Object} data - Permission data
   */
  const updatePermission = async (data) => {
    const { id, action, description } = data;
    try {
      await db.query(
        'UPDATE Permissions SET action = ?, description = ?, updatedAt = NOW() WHERE id = ?',
        [action, description, id]
      );
      return { id, action, description };
    } catch (error) {
      console.error('Error updating permission:', error.message);
      throw new Error('Failed to update permission');
    }
  };
  
  /**
   * Delete a permission
   * @param {Number} id - Permission ID
   */
  const deletePermission = async (id) => {
    try {
      await db.query('DELETE FROM Permissions WHERE id = ?', [id]);
      return { message: 'Permission deleted successfully' };
    } catch (error) {
      console.error('Error deleting permission:', error.message);
      throw new Error('Failed to delete permission');
    }
  };
  
  module.exports = {
    createPermission,
    listPermissions,
    updatePermission,
    deletePermission,
  };
  