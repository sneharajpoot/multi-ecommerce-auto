import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, requiredRole, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.userRole);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && (!requiredRole || userRole === requiredRole) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
