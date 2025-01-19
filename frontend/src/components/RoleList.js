import React, { useEffect, useState } from 'react';
import { fetchRoles, addRole, updateRole, deleteRole } from '../api/roleApi'; // Import the API functions
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [currentRole, setCurrentRole] = useState({ id: '', name: '', description: '' });
  const [showModal, setShowModal] = useState(false);
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

  useEffect(() => {
    getRoles();
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
      setShowModal(false);
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

  const handleShowModal = (role = { id: '', name: '', description: '' }) => {
    setCurrentRole(role);
    setIsEditMode(!!role.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
            <Button variant="primary" onClick={() => handleShowModal()}>Add Role</Button>
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
                  <td>{role.name}</td>
                  <td>{role.description}</td>
                  <td>
                    <Button variant="primary" className="me-2" onClick={() => handleShowModal(role)}>Edit</Button>
                    <Button variant="danger" className="me-2" onClick={() => handleDeleteRole(role.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal show={showModal} onHide={handleCloseModal}>
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
                    value={currentRole.name}
                    onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
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
              <Button variant="secondary" onClick={handleCloseModal} disabled={loading}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveRole} disabled={loading}>
                {isEditMode ? 'Update Role' : 'Add Role'}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default RoleList;
