import React from 'react';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, userRole, requiredRole, children }) => {
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  if (userRole !== requiredRole) {
    return <Redirect to="/" />;
  }

  return children;
};

export default ProtectedRoute;
