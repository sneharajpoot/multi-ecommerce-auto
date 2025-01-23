import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { signup } from "../actions/authActions";
import "./Signup.css"; // Import the new CSS file

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth);
  const [credentials, setCredentials] = useState({ name :'',email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(credentials)).catch((err) => {
      setError(err.message); // Use err.message to display the error
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/login');
    }
  }, [auth.isAuthenticated, history]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
        <div className="mt-3 text-center">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
