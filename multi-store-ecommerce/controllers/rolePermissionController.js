const db = require('../config/db');
const Models = require('../models'); // Correct path to models
const { RolePermissions, Role, Module, Permission } = Models;

// Create RolePermission
exports.createRolePermission = async (req, res) => {
  const { roleId, permissionId } = req.body;

  try {
    const newRolePermission = await RolePermissions.create({ roleId, permissionId });
    res.status(201).json({ message: 'RolePermission created successfully', rolePermission: newRolePermission });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Get All RolePermissions
exports.getAllRolePermissions = async (req, res) => {
  try {
    //
    // const rolePermissions = await RolePermissions.findAll();

    let sql = `
      SELECT r.id roleId, r.roleName, m.id moduleId, m.name moduleName , 
      COALESCE(rp.id, 0) AS rolePermissionId, 
      COALESCE(rp.view, FALSE) AS view, 
      COALESCE(rp.edit, FALSE) AS edit 
      FROM Roles r JOIN Modules m LEFT 
      JOIN RolePermissions rp ON rp.roleId=r.id and rp.moduleId = m.id  `;

    let roleId = req.query.roleId;

    if (roleId) {

      sql += ` WHERE r.id = ${roleId} `;
    }
    const rolePermissions = await db.query(sql);



    console.log(rolePermissions[0])

    res.status(200).json(rolePermissions[0]);

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Get RolePermission by ID
exports.getRolePermissionById = async (req, res) => {
  const { id } = req.params;

  try {

    // use sql query to get rolePermission
    const rolePermission = await db.query(`
      SELECT r.id roleId, r.roleName, m.id moduleId, m.name moduleName , 
      COALESCE(rp.id, 0) AS rolePermissionId, 
      COALESCE(rp.view, FALSE) AS view, 
      COALESCE(rp.edit, FALSE) AS edit 
      FROM Roles r JOIN Modules m LEFT 
      WHERE rp.id = ${id}`,
      { type: QueryTypes.SELECT });

    // const rolePermission = await RolePermissions.findByPk(id, {
    //   include: [
    //     { model: Role, attributes: ['id', 'name'] },
    //     { model: Permission, attributes: ['id', 'action'] },
    //     { model: Module, attributes: ['id', 'name'] },
    //   ],
    // });
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
  const { roleId } = req.params;
  const { rolePermissionId, moduleId, view, edit } = req.body;

  console.log( rolePermissionId, moduleId, view, edit)
  try {
    if (rolePermissionId) {

      const rolePermission = await RolePermissions.findByPk(rolePermissionId);
      if (!rolePermission) {
        return res.status(404).json({ error: 'RolePermission not found' });
      }

      // update rolePermission
      rolePermission.view = view;
      rolePermission.edit = edit;
      rolePermission.moduleId = moduleId;
      rolePermission.roleId = roleId;

     let resp =  await rolePermission.save();

     console.log('resp-->s', resp)
      // rolePermission.roleId = roleId;
      // rolePermission.permissionId = permissionId;
      // rolePermission.moduleId = moduleId;

      // await rolePermission.save();

    } else {

      const newRolePermission = await RolePermissions.create({ roleId, moduleId, view, edit });
    }


    res.status(200).json({ message: 'RolePermission updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Delete RolePermission
exports.deleteRolePermission = async (req, res) => {
  const { id } = req.params;

  try {
    const rolePermission = await RolePermissions.findByPk(id);
    if (!rolePermission) {
      return res.status(404).json({ error: 'RolePermission not found' });
    }

    await rolePermission.destroy();
    res.status(200).json({ message: 'RolePermission deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
