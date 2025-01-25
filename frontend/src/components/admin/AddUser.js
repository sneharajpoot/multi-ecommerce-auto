import React, { useState } from 'react';
import { addUser } from '../../api/userApi'; // Import the API function
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation

const AddUser = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '', status: 'active' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const history = useHistory(); // Initialize useHistory

  const handleSaveUser = async () => {
    setLoading(true); // Set loading to true
    try {
      await addUser(user);
      setMessage('User added successfully!');
      setError('');
      history.push('/dashboard/users'); // Navigate back to the user list
    } catch (error) {
      setError('Error adding user.');
      setMessage('');
      console.error('Error adding user:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleCancel = () => {
    history.push('/dashboard/users'); // Navigate back to the user list
  };

  return (
    <div className=" " >
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center my-4">Add User</h2>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="loader">Loading...</div>} {/* Add loader */}
          <form>
            <div className="mb-3">
              <label htmlFor="formUserName" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="formUserName"
                placeholder="Enter user name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formUserEmail" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="formUserEmail"
                placeholder="Enter user email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formUserPassword" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="formUserPassword"
                placeholder="Enter user password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSaveUser} disabled={loading}>
              Add User
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={loading}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
