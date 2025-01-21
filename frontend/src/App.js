import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/Signup"; // Import the renamed Signup component
import StoreSignup from "./components/StoreSignup"; // Import the new StoreSignup component
import Dashboard from "./components/Dashboard"; // Import the new component
import { toast } from 'react-toastify'; // Import react-toastify
import axiosInstance from './axiosConfig'; // Import the configured axios instance
import StoreList from './components/StoreList'; // Import the StoreList component
import { loadUser } from './actions/authActions'; // Import the loadUser action
import CategoryList from './components/CategoryList'; // Import the CategoryList component
import ProductTags from './components/ProductTags'; // Import the ProductTags component
import AboutUs from './pages/AboutUs'; // Import the AboutUs page
import Contact from './pages/Contact'; // Import the Contact page
import PrivacyPolicy from './pages/PrivacyPolicy'; // Import the PrivacyPolicy page
import ReturnPolicy from './pages/ReturnPolicy'; // Import the ReturnPolicy page
import Footer from './components/Footer'; // Import the Footer component
import TopBar from './components/TopBar'; // Import the TopBar component
import ProductPage from './components/ProductPage'; // Import the ProductPage component

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.userRole);

  useEffect(() => {
    dispatch(loadUser()); // Load user on app mount
  }, [dispatch]);

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
        <Switch>
          <Route path="/" exact>
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Home />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/admin" render={() => (
            <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          )} />
          <Route path="/product/:productId">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <ProductPage />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/admin-signup" component={Signup} /> {/* Update route for Signup */}
          <Route path="/store-signup" component={StoreSignup} /> {/* Add route for StoreSignup */}
          <ProtectedRoute path="/dashboard" component={Dashboard} /> {/* Use ProtectedRoute for dashboard */}
          <Route path="/about-us" component={AboutUs} /> {/* Add route for AboutUs */}
          <Route path="/contact" component={Contact} /> {/* Add route for Contact */}
          <Route path="/privacy-policy" component={PrivacyPolicy} /> {/* Add route for PrivacyPolicy */}
          <Route path="/return-policy" component={ReturnPolicy} /> {/* Add route for ReturnPolicy */}
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
