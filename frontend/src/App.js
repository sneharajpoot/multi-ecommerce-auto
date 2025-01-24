import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
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
import CartPage from './components/CartPage'; // Import the CartPage component
import {jwtDecode} from "jwt-decode"; // Correct the import for jwtDecode
import CheckoutPage from './components/CheckoutPage'; // Import the CheckoutPage component

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const token = auth.token;
  let userRole = auth.user?.role;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      userRole = decodedToken.role;
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userId', decodedToken.id);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: decodedToken, token } });
    }
  }, [dispatch]);

  const showSuccessMessage = (message) => {
    toast.success(message);
  };

  const showErrorMessage = (message) => {
    toast.error(message);
  };

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <ProtectedRoute
            path="/dashboard"
            component={Dashboard}
            isAuthenticated={isAuthenticated}
            userRole={userRole}
            requiredRole={['admin', 'store_admin']}
          />
          <Route path="/" exact>
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Home />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/product/:productId">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <ProductPage />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/store-signup" component={StoreSignup} /> {/* Add route for StoreSignup */}
          <Route path="/about-us" component={AboutUs} /> {/* Add route for AboutUs */}
          <Route path="/contact" component={Contact} /> {/* Add route for Contact */}
          <Route path="/privacy-policy" component={PrivacyPolicy} /> {/* Add route for PrivacyPolicy */}
          <Route path="/return-policy" component={ReturnPolicy} /> {/* Add route for ReturnPolicy */}
          <Route path="/cart">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <CartPage />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/checkout" component={CheckoutPage} /> {/* Add route for CheckoutPage */}
          <Route path="/redirect" render={() => {
            if (isAuthenticated) {
              if (userRole === 'admin' || userRole === 'store_admin') {
                return <Redirect to="/dashboard" />;
              } else {
                return <Redirect to="/" />;
              }
            } else {
              return <Redirect to="/login" />;
            }
          }} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
