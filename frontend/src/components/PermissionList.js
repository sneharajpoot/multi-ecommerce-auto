import React, { useEffect, useState } from 'react';
import { fetchPermissions, addPermission, updatePermission, deletePermission } from '../api/permissionApi'; // Import the API functions
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components

const PermissionList = () => {
  const [permissions, setPermissions] = useState([]);
  const [currentPermission, setCurrentPermission] = useState({ id: '', name: '', description: '' });
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const getPermissions = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await fetchPermissions();
      setPermissions(response.data);
    } catch (error) {
      setError('Error fetching permissions.');
      console.error('Error fetching permissions:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const handleSavePermission = async () => {
    setLoading(true); // Set loading to true
    try {
      if (isEditMode) {
        await updatePermission(currentPermission.id, currentPermission);
        setMessage('Permission updated successfully!');
      } else {
        await addPermission(currentPermission);
        setMessage('Permission added successfully!');
      }
      setError('');
      setShowModal(false);
      getPermissions(); // Refresh the permission list
    } catch (error) {
      setError(isEditMode ? 'Error updating permission.' : 'Error adding permission.');
      setMessage('');
      console.error(isEditMode ? 'Error updating permission:' : 'Error adding permission:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleDeletePermission = async (permissionId) => {
    setLoading(true); // Set loading to true
    try {
      await deletePermission(permissionId);
      getPermissions(); // Refresh the permission list
      setMessage('Permission deleted successfully!');
      setError('');
    } catch (error) {
      setError('Error deleting permission.');
      setMessage('');
      console.error('Error deleting permission:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleShowModal = (permission = { id: '', name: '', description: '' }) => {
    setCurrentPermission(permission);
    setIsEditMode(!!permission.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className=" " >
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="text-center my-4">Permission List</h2>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="loader">Loading...</div>} {/* Add loader */}
          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary" onClick={() => handleShowModal()}>Add Permission</Button>
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
              {permissions.map((permission) => (
                <tr key={permission.id}>
                  <td>{permission.id}</td>
                  <td>{permission.action}</td>
                  <td>{permission.description}</td>
                  <td>
                    <Button variant="primary" className="me-2" onClick={() => handleShowModal(permission)}>Edit</Button>
                    <Button variant="danger" className="me-2" onClick={() => handleDeletePermission(permission.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{isEditMode ? 'Update Permission' : 'Add Permission'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formPermissionName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter permission name"
                    value={currentPermission.name}
                    onChange={(e) => setCurrentPermission({ ...currentPermission, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPermissionDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter permission description"
                    value={currentPermission.description}
                    onChange={(e) => setCurrentPermission({ ...currentPermission, description: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal} disabled={loading}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSavePermission} disabled={loading}>
                {isEditMode ? 'Update Permission' : 'Add Permission'}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default PermissionList;
