import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Store from "./components/Store";
import AdminPanel from "./components/AdminPanel";
import ProductDetail from "./components/ProductDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminSignup from "./components/AdminSignup";
import StoreDashboard from "./components/StoreDashboard"; // Import the new component
import { toast } from 'react-toastify'; // Import react-toastify
import axiosInstance from './axiosConfig'; // Import the configured axios instance

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.userRole);

  const showSuccessMessage = (message) => {
    toast.success(message);
  };

  const showErrorMessage = (message) => {
    toast.error(message);
  };

  // Example usage:
  // showSuccessMessage('This is a success message!');
  // showErrorMessage('This is an error message!');

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/store" component={Store} />
          <Route path="/admin" render={() => (
            <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          )} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/admin-signup" component={AdminSignup} />
          <Route path="/dashboard" component={StoreDashboard} /> {/* Add this line */}
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
