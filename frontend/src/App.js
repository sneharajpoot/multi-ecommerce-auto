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
import Menu from './components/comman/Menu'; // Import the Menu component
import ProductDetail from './components/ProductDetail'; // Import the ProductPage component
import CartPage from './components/CartPage'; // Import the CartPage component
import CheckoutPage from './components/CheckoutPage'; // Import the CheckoutPage component
import OrderSuccess from './components/OrderSuccess'; // Import the OrderSuccess component
import OrderList from './components/OrderList'; // Import the OrderList component
import OrderDetail from './components/OrderDetail'; // Import the OrderDetail component
import {jwtDecode} from "jwt-decode"; // Correct the import for jwtDecode
import { showErrorMessage, showSuccessMessage } from './utils/toastUtils'; // Import toast functions
import SearchPage from './components/SearchPage'; // Import the SearchPage component
import PaymentPage from './components/PaymentPage'; // Import the PaymentPage component
import BannerPage from './components/admin/BannerPage'; // Import the BannerPage component from the admin directory
import NewArrivals from './components/NewArrivals'; // Import the NewArrivals component
import BestSellers from './components/BestSellers'; // Import the BestSellers component
import OnSale from './components/OnSale'; // Import the OnSale component

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
          <ProtectedRoute
            path="/banners"
            component={BannerPage}
            isAuthenticated={isAuthenticated}
            userRole={userRole}
            requiredRole={['admin', 'store_admin']}
          />
          <Route path="/" exact>
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <Home />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/product/:productId">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <ProductDetail />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/store-signup">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <StoreSignup />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/about-us">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <AboutUs />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/contact">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <Contact />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/privacy-policy">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <PrivacyPolicy />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/return-policy">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <ReturnPolicy />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/checkout">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <CheckoutPage />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/order-success">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <OrderSuccess />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/orders" exact>
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <OrderList />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/orders/:orderId">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <OrderDetail />
            <Footer /> {/* Use the Footer component */}
          </Route> 
          <Route path="/cart">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <CartPage />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/search">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <SearchPage />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/payment">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <PaymentPage />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/shop/new-arrivals">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <NewArrivals />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/shop/best-sellers">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <BestSellers />
            <Footer /> {/* Use the Footer component */}
          </Route>
          <Route path="/shop/sale">
            <TopBar /> {/* Use the TopBar component for customer routes */}
            <Menu /> {/* Use the Menu component */}
            <OnSale />
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
