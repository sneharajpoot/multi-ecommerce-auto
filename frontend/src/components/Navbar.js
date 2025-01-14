import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"; // Import the new CSS file

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Brand</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/store">Store</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Admin</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin-signup">Admin Signup</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="/path/to/profile-icon.png" alt="Profile" className="profile-icon" />
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/profile">View Profile</Link></li>
                <li><Link className="dropdown-item" to="/orders">My Orders</Link></li>
                <li><Link className="dropdown-item" to="/wishlist">Wishlist</Link></li>
                <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
