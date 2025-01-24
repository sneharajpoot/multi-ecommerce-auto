import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems, syncCartToServer } from '../api/cartApi'; // Import the cart API functions
import { logout } from '../actions/authActions'; // Import the logout action
import "./Navbar.css"; // Import the new CSS file
import logo from '../assets/logo.png'; // Import the logo image
import profileIcon from '../assets/profile-icon.png'; // Import the profile icon
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JavaScript

const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const [cartCount, setCartCount] = useState(0);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userRole = useSelector(state => state.auth.user?.role);
  const customerId = useSelector(state => state.auth.user?.id);
  const dispatch = useDispatch();

  const changeLanguage = (language) => {
    // Implement language change logic here
    console.log(`Language changed to: ${language}`);
  };

  useEffect(() => {
    const updateCartCount = async () => {
      try {
        const response = await fetchCartItems(customerId);
        const cartItems = response.data.cartItems || [];
        setCartCount(cartItems.length);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, [customerId]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartCount(cartItems.length);
  }, [location]);

  const handleCartClick = async () => {
    if (isAuthenticated && customerId) {
      await syncCartToServer(customerId);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Brand Logo" className="logo" style={{ height: '20px' }} /> {/* Add the logo with height */}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {isDashboard ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/stores">Stores</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/products">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/orders">Orders</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/settings">Settings</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/store">Store</Link>
                </li>
                {!isAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">Sign Up</Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/admin-signup">Admin Signup</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/store-signup">Store Signup</Link> {/* Add link for store signup */}
                </li>
              </>
            )}
          </ul>
          <div className="dropdown me-3">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Language
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
              <li><button className="dropdown-item" onClick={() => changeLanguage('en')}>English</button></li>
              <li><button className="dropdown-item" onClick={() => changeLanguage('es')}>Spanish</button></li>
              <li><button className="dropdown-item" onClick={() => changeLanguage('fr')}>French</button></li>
            </ul>
          </div>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={profileIcon} alt="Profile Icon" className="profile-icon" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
              <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
            </ul>
          </div>
          <li className="nav-item">
            <Link to="/cart" className="nav-link" onClick={handleCartClick}>
              Cart <span className="badge badge-pill badge-primary">{cartCount}</span>
            </Link>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
