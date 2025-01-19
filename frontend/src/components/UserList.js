import React, { useEffect, useState } from 'react';
import { fetchUsers, addUser, updateUser, deleteUser, updateUserStatus } from '../api/userApi'; // Import the API functions
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState({ id: '', name: '', email: '', password: '', role: '', status: 'active' });
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const history = useHistory(); // Initialize useHistory

  const getUsers = async (page = 1) => {
    setLoading(true); // Set loading to true
    try {
      const response = await fetchUsers(page);
      setUsers(Array.isArray(response.data.users) ? response.data.users : []); // Ensure users is an array
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      setError('Error fetching users.');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSaveUser = async () => {
    setLoading(true); // Set loading to true
    try {
      if (isEditMode) {
        await updateUser(currentUser.id, currentUser);
        setMessage('User updated successfully!');
      } else {
        await addUser(currentUser);
        setMessage('User added successfully!');
      }
      setError('');
      setShowModal(false);
      getUsers(currentPage); // Refresh the user list
    } catch (error) {
      setError(isEditMode ? 'Error updating user.' : 'Error adding user.');
      setMessage('');
      console.error(isEditMode ? 'Error updating user:' : 'Error adding user:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleDeleteUser = async (userId) => {
    setLoading(true); // Set loading to true
    try {
      await deleteUser(userId);
      getUsers(currentPage); // Refresh the user list
      setMessage('User deleted successfully!');
      setError('');
    } catch (error) {
      setError('Error deleting user.');
      setMessage('');
      console.error('Error deleting user:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleUpdateStatus = async (userId, status) => {
    setLoading(true); // Set loading to true
    try {
      await updateUserStatus(userId, status);
      getUsers(currentPage); // Refresh the user list
      setMessage('User status updated successfully!');
      setError('');
    } catch (error) {
      setError('Error updating user status.');
      setMessage('');
      console.error('Error updating user status:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleShowModal = (user = { id: '', name: '', email: '', password: '', role: '', status: 'active' }) => {
    setCurrentUser(user);
    setIsEditMode(!!user.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePageChange = (page) => {
    getUsers(page);
  };

  return (
    <div className=" " >
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="text-center my-4">User List</h2>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="loader">Loading...</div>} {/* Add loader */}
          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary" onClick={() => handleShowModal()}>Add User</Button>
          </div>
          <table className="table table-striped" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{(currentPage - 1) * 10 + index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>{new Date(user.updatedAt).toLocaleString()}</td>
                  <td>{user.status}</td>
                  <td>
                    <Button variant="primary" className="me-2" onClick={() => handleShowModal(user)}>Edit</Button>
                    <Button variant="danger" className="me-2" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                    <Button variant="info" onClick={() => handleUpdateStatus(user.id, user.status === 'active' ? 'inactive' : 'active')}>
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{isEditMode ? 'Update User' : 'Add User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formUserName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter user name"
                    value={currentUser.name}
                    onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formUserEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter user email"
                    value={currentUser.email}
                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  />
                </Form.Group>
                {!isEditMode && (
                  <Form.Group className="mb-3" controlId="formUserPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter user password"
                      value={currentUser.password}
                      onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                    />
                  </Form.Group>
                )}
                <Form.Group className="mb-3" controlId="formUserRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter user role"
                    value={currentUser.role}
                    onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formUserStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={currentUser.status}
                    onChange={(e) => setCurrentUser({ ...currentUser, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal} disabled={loading}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveUser} disabled={loading}>
                {isEditMode ? 'Update User' : 'Add User'}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default UserList;
