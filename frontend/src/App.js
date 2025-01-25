import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./store";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/Signup"; // Import the renamed Signup component
import StoreSignup from "./components/StoreSignup"; // Import the new StoreSignup component
import Dashboard from "./components/admin/Dashboard"; // Import the new component
import { toast } from 'react-toastify'; // Import react-toastify
import { loadUser } from './actions/authActions'; // Import the loadUser action
import AboutUs from './pages/AboutUs'; // Import the AboutUs page
import Contact from './pages/Contact'; // Import the Contact page
import PrivacyPolicy from './pages/PrivacyPolicy'; // Import the PrivacyPolicy page
import ReturnPolicy from './pages/ReturnPolicy'; // Import the ReturnPolicy page
import Footer from './components/comman/Footer'; // Fix the import path for Footer
import TopBar from './components/comman/TopBar'; // Fix the import path for TopBar
import ProductPage from './components/ProductPage'; // Import the ProductPage component
import CartPage from './components/CartPage'; // Import the CartPage component
import CheckoutPage from './components/CheckoutPage'; // Import the CheckoutPage component
import OrderSuccess from './components/OrderSuccess'; // Import the OrderSuccess component
import OrderList from './components/OrderList'; // Import the OrderList component
import OrderDetail from './components/OrderDetail'; // Import the OrderDetail component
import {jwtDecode} from "jwt-decode"; // Correct the import for jwtDecode

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
          <Route path="/store-signup">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <StoreSignup />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/about-us">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <AboutUs />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/contact">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Contact />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/privacy-policy">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <PrivacyPolicy />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/return-policy">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <ReturnPolicy />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/checkout">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <CheckoutPage />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/order-success">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <OrderSuccess />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/orders" exact>
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <OrderList />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/orders/:orderId">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <OrderDetail />
            <Footer /> {/* Use the Footer component */}
          </Route> 
          <Route path="/cart">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <CartPage />
            <Footer /> {/* Use the Footer component */}
          </Route>
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
