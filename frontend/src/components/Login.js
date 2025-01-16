import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from "../actions/authActions";
import "./Login.css"; // Import the new CSS file

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth);
  const [credentials, setCredentials] = useState({ email: 'admin@example.com', password: 'Asd@1212' }); // Updated hardcoded credentials

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }, [auth.isAuthenticated, history]);

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
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
