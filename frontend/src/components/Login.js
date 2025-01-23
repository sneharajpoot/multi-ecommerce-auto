import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { login } from "../actions/authActions";
import "./Login.css"; // Import the new CSS file

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth);
  const [credentials, setCredentials] = useState({ email: 'admin@example.com', password: 'Asd@1212' }); // Updated hardcoded credentials
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      const userRole = auth.user?.role;
      console.log('User role:',auth, userRole);
      if (userRole === 'store_admin' || userRole === 'admin') {
        history.push('/dashboard');
      } else {
        history.push('/');
      }
    }
  }, [auth.isAuthenticated, auth.user, history]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="mt-3 text-center">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
