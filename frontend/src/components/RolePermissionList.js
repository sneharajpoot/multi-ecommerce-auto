import React, { useEffect, useState } from 'react';
import { fetchRolePermissions, addRolePermission, updateRolePermission, deleteRolePermission } from '../api/rolePermissionApi'; // Import the API functions
import { fetchRoles } from '../api/roleApi'; // Import the API function for fetching roles
import { fetchPermissions } from '../api/permissionApi'; // Import the API function for fetching permissions
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components

const RolePermissionList = () => {
  const [rolePermissions, setRolePermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [currentRolePermission, setCurrentRolePermission] = useState({ id: '', roleId: '', permissionId: '' });
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const getRolePermissions = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await fetchRolePermissions();

      console.log(response.data);
      setRolePermissions(response.data);
    } catch (error) {
      setError('Error fetching role permissions.');
      console.error('Error fetching role permissions:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const getRoles = async () => {
    try {
      const response = await fetchRoles();
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
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

  useEffect(() => {
    getRolePermissions();
    getRoles();
    getPermissions();
  }, []);

  const handleSaveRolePermission = async () => {
    setLoading(true); // Set loading to true
    try {
      if (isEditMode) {
        await updateRolePermission(currentRolePermission.id, currentRolePermission);
        setMessage('Role permission updated successfully!');
      } else {
        await addRolePermission(currentRolePermission);
        setMessage('Role permission added successfully!');
      }
      setError('');
      setShowModal(false);
      getRolePermissions(); // Refresh the role permission list
    } catch (error) {
      setError(isEditMode ? 'Error updating role permission.' : 'Error adding role permission.');
      setMessage('');
      console.error(isEditMode ? 'Error updating role permission:' : 'Error adding role permission:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleDeleteRolePermission = async (rolePermissionId) => {
    setLoading(true); // Set loading to true
    try {
      await deleteRolePermission(rolePermissionId);
      getRolePermissions(); // Refresh the role permission list
      setMessage('Role permission deleted successfully!');
      setError('');
    } catch (error) {
      setError('Error deleting role permission.');
      setMessage('');
      console.error('Error deleting role permission:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleShowModal = (rolePermission = { id: '', roleId: '', permissionId: '' }) => {
    setCurrentRolePermission(rolePermission);
    setIsEditMode(!!rolePermission.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className=" " >
      <div className="row justify-content-center">
        <div className="col-md-10">
          
          <h2 className="text-center my-4">Role Permission List</h2>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="loader">Loading...</div>} {/* Add loader */}
          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary" onClick={() => handleShowModal()}>Add Role Permission</Button>
          </div>
          <table className="table table-striped" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Role</th>
                <th>Permission</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rolePermissions.map((rolePermission) => (
                <tr key={rolePermission.id}>
                  <td> {rolePermission.id}</td>
                  <td> {rolePermission.action}</td> 
                  <td> {rolePermission.module_name}</td>
                  {/* <td>{permissions.find(permission => permission.id === rolePermission.permissionId)?.name}</td> */}
                  <td>
                    <Button variant="primary" className="me-2" onClick={() => handleShowModal(rolePermission)}>Edit</Button>
                    <Button variant="danger" className="me-2" onClick={() => handleDeleteRolePermission(rolePermission.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{isEditMode ? 'Update Role Permission' : 'Add Role Permission'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formRoleId">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    value={currentRolePermission.roleId}
                    onChange={(e) => setCurrentRolePermission({ ...currentRolePermission, roleId: e.target.value })}
                  >
                    <option value="">Select Role</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.roleName}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPermissionId">
                  <Form.Label>Permission</Form.Label>
                  <Form.Select
                    value={currentRolePermission.permissionId}
                    onChange={(e) => setCurrentRolePermission({ ...currentRolePermission, permissionId: e.target.value })}
                  >
                    <option value="">Select Permission</option>
                    {permissions.map(permission => (
                      <option key={permission.id} value={permission.id}>{permission.action}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal} disabled={loading}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveRolePermission} disabled={loading}>
                {isEditMode ? 'Update Role Permission' : 'Add Role Permission'}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default RolePermissionList;
