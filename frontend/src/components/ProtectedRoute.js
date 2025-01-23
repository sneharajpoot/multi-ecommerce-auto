import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, requiredRole, ...rest }) => {
  const auth = useSelector(state => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const userRole = auth.user?.role;

  console.log("ProtectedRoute props:", { isAuthenticated, userRole, requiredRole, Component });

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated && requiredRole?.includes(userRole)   ) {
          return <Component {...props} />;
        } else {
          console.log(`Navigating to login page from ${Component.name}`);
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
