import React from 'react';
import { Switch, Link, useRouteMatch } from 'react-router-dom';
import './Dashboard.css'; // Import the new CSS file
import StoreList from './StoreList'; // Import the StoreList component
import Orders from './Orders'; // Import the Orders component
import Settings from './Settings'; // Import the Settings component
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import CategoryList from './CategoryList'; // Import the CategoryList component
import ProductList from './ProductList'; // Import the ProductList component
import AddProduct from './AddProduct'; // Import the AddProduct component
import UpdateProduct from './UpdateProduct'; // Import the UpdateProduct component
import ProductDetail from './ProductDetail'; // Import the ProductDetail component

const Dashboard = () => {
  let { path, url } = useRouteMatch();

  return (
    <div className="dashboard">
      <div className="sidebar fixed">
        <h2 style={{ height: '100px' }}>Sidebar</h2> {/* Hardcoded height for the logo */}
        <ul>
          <li><Link to={`${url}/stores`}>Stores</Link></li>
          <li><Link to={`${url}/products`}>Products</Link></li>
          <li><Link to={`${url}/orders`}>Orders</Link></li>
          <li><Link to={`${url}/settings`}>Settings</Link></li>
          <li><Link to={`${url}/categories`}>Categories</Link></li> {/* Add the Categories tab */}
        </ul>
      </div>
      <div className="main-content">
        <div className="topbar fixed">
          <h2>Dashboard Top Menu</h2>
        </div>
        <div className="content">
          <Switch>
            <ProtectedRoute path={`${path}/stores`} component={StoreList} />
            <ProtectedRoute path={`${path}/products`} exact component={ProductList} />
            <ProtectedRoute path={`${path}/products/add`} component={AddProduct} />
            <ProtectedRoute path={`${path}/products/update/:id`} component={UpdateProduct} />
            <ProtectedRoute path={`${path}/products/:id`} component={ProductDetail} />
            <ProtectedRoute path={`${path}/orders`} component={Orders} />
            <ProtectedRoute path={`${path}/settings`} component={Settings} />
            {/* Add the route for Categories */}
            <ProtectedRoute path={`${path}/categories`} component={CategoryList} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
