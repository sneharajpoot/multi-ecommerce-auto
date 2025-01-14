import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard">Dashboard Home</Link></li>
        <li><Link to="/dashboard/store-management">Store Management</Link></li>
        <li><Link to="/dashboard/user-management">User Management</Link></li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
