import React, { useEffect, useState } from 'react';
import { fetchRoles, addRole, updateRole, deleteRole } from '../../api/roleApi'; // Import the API functions
import { fetchPermissions } from '../../api/permissionApi'; // Import the API function for fetching permissions
import { fetchModules } from '../../api/moduleApi'; // Import the API function for fetching modules
import { addRolePermission, fetchRolePermissions, updateRolePermission } from '../../api/rolePermissionApi'; // Import the API function for adding and updating role permissions
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [modules, setModules] = useState([]);
  const [currentRole, setCurrentRole] = useState({ id: '', createdAt:'', description:'', roleName:'', updatedAt:'', uuid:'' });
  const [currentRolePermission, setCurrentRolePermission] = useState({ roleId: '', permissionId: '', moduleId: '' });
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showRolePermissionModal, setShowRolePermissionModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const getRoles = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await fetchRoles();
      setRoles(response.data);
    } catch (error) {
      setError('Error fetching roles.');
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const getPermissions = async () => {
    try {
      const response = await fetchPermissions();
      setPermissions(response.data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const getRolePermissions = async (roleId) => {
    try {
      const response = await fetchRolePermissions(roleId);
      setRolePermissions(response.data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const getModules = async () => {
    try {
      const response = await fetchModules();
      setModules(response.data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  useEffect(() => {
    getRoles();
    getPermissions();
    getModules();
  }, []);

  const handleSaveRole = async () => {
    setLoading(true); // Set loading to true
    try {
      if (isEditMode) {
        await updateRole(currentRole.id, currentRole);
        setMessage('Role updated successfully!');
      } else {
        await addRole(currentRole);
        setMessage('Role added successfully!');
      }
      setError('');
      setShowRoleModal(false);
      getRoles(); // Refresh the role list
    } catch (error) {
      setError(isEditMode ? 'Error updating role.' : 'Error adding role.');
      setMessage('');
      console.error(isEditMode ? 'Error updating role:' : 'Error adding role:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleDeleteRole = async (roleId) => {
    setLoading(true); // Set loading to true
    try {
      await deleteRole(roleId);
      getRoles(); // Refresh the role list
      setMessage('Role deleted successfully!');
      setError('');
    } catch (error) {
      setError('Error deleting role.');
      setMessage('');
      console.error('Error deleting role:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleSaveRolePermission = async () => {
    setLoading(true); // Set loading to true
    try {
      await addRolePermission(currentRolePermission);
      setMessage('Role permission added successfully!');
      setError('');
      setShowRolePermissionModal(false);
    } catch (error) {
      setError('Error adding role permission.');
      setMessage('');
      console.error('Error adding role permission:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleUpdateRolePermission = async (index, updatedPermission) => {
    setLoading(true); // Set loading to true
    try { 
      await updateRolePermission(currentRole.id, updatedPermission);
      setMessage('Role permission updated successfully!');
      setError('');
      getRolePermissions(currentRole.id); // Refresh the role permission list
    } catch (error) {
      setError('Error updating role permission.');
      setMessage('');
      console.error('Error updating role permission:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleShowRoleModal = (role) => {
    setCurrentRole(role);
    setIsEditMode(!!role.id);
    setShowRoleModal(true);
  };

  const handleShowRolePermissionModal = (role) => {
    setCurrentRole(role);
    getRolePermissions(role.id);
    setShowRolePermissionModal(true);
  };

  const handleCloseRoleModal = () => {
    setShowRoleModal(false);
  };

  const handleCloseRolePermissionModal = () => {
    setShowRolePermissionModal(false);
  };

  const handlePermissionChange = (index, field, value) => {
    const updatedPermissions = [...rolePermissions];
    updatedPermissions[index][field] = value;
    setRolePermissions(updatedPermissions);
    handleUpdateRolePermission(index, updatedPermissions[index]);
  };

  return (
    <div className=" " >
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="text-center my-4">Role List</h2>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="loader">Loading...</div>} {/* Add loader */}
          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary" onClick={() => handleShowRoleModal({ id: '', createdAt:'', description:'', roleName:'', updatedAt:'', uuid:'' })}>Add Role</Button>
          </div>
          <table className="table table-striped" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.roleName}</td>
                  <td>{role.description}</td>
                  <td>
                    <Button variant="primary" className="me-2" onClick={() => handleShowRoleModal(role)}>Edit</Button>
                    <Button variant="danger" className="me-2" onClick={() => handleDeleteRole(role.id)}>Delete</Button>
                    <Button variant="info" onClick={() => handleShowRolePermissionModal(role)}>Add Permission</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add/ Update role */}
          <Modal show={showRoleModal} onHide={handleCloseRoleModal}>
            <Modal.Header closeButton>
              <Modal.Title>{isEditMode ? 'Update Role' : 'Add Role'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formRoleName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter role name"
                    value={currentRole.roleName}
                    onChange={(e) => setCurrentRole({ ...currentRole, roleName: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRoleDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter role description"
                    value={currentRole.description}
                    onChange={(e) => setCurrentRole({ ...currentRole, description: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseRoleModal} disabled={loading}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveRole} disabled={loading}>
                {isEditMode ? 'Update Role' : 'Add Role'}
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Add permission */}
          <Modal show={showRolePermissionModal} onHide={handleCloseRolePermissionModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add Role Permission</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Module</th>
                    <th>View</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {rolePermissions.map((module, index) => (
                    <tr key={index}>
                      <td>{module.rolePermissionId}</td>
                      <td>{module.moduleName}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={module.view}
                          onChange={(e) => handlePermissionChange(index, 'view', e.target.checked)}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={module.edit}
                          onChange={(e) => handlePermissionChange(index, 'edit', e.target.checked)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseRolePermissionModal} disabled={loading}>
                Cancel
              </Button>
              {/* <Button varia  */}
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default RoleList;
