import React, { useState, useEffect } from 'react';
import { fetchUserById, updateUser } from '../../api/userApi'; // Import the API functions
import { useHistory, useParams } from 'react-router-dom'; // Import useHistory and useParams for navigation

const UpdateUser = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState({ name: '', email: '', status: 'active' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    const getUser = async () => {
      setLoading(true); // Set loading to true
      try {
        const response = await fetchUserById(id);
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user.');
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    getUser();
  }, [id]);

  const handleSaveUser = async () => {
    setLoading(true); // Set loading to true
    try {
      await updateUser(user.id, user);
      setMessage('User updated successfully!');
      setError('');
      history.push('/dashboard/users'); // Navigate back to the user list
    } catch (error) {
      setError('Error updating user.');
      setMessage('');
      console.error('Error updating user:', error);
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
          <h2 className="text-center my-4">Update User</h2>
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
              <label htmlFor="formUserStatus" className="form-label">Status</label>
              <select
                className="form-control"
                id="formUserStatus"
                value={user.status}
                onChange={(e) => setUser({ ...user, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSaveUser} disabled={loading}>
              Update User
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={loading}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
