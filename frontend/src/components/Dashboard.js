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
import UserList from './UserList'; // Import the UserList component
import AddUser from './AddUser'; // Import the AddUser component
import UpdateUser from './UpdateUser'; // Import the UpdateUser component
import RoleList from './RoleList'; // Import the RoleList component
import ModuleList from './ModuleList'; // Import the ModuleList component
import ProductTags from './ProductTags'; // Import the ProductTags component

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
          <li><Link to={`${url}/users`}>Users</Link></li> {/* Add the Users tab */}
          <li><Link to={`${url}/roles`}>Roles</Link></li> {/* Add the Roles tab */}
          <li><Link to={`${url}/modules`}>Modules</Link></li> {/* Add the Modules tab */}
          <li><Link to={`${url}/product-tags`}>Product Tags</Link></li> {/* Add link to Product Tags */}
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
            {/* Add the routes for Users */}
            <ProtectedRoute path={`${path}/users`} exact component={UserList} />
            <ProtectedRoute path={`${path}/users/add`} component={AddUser} />
            <ProtectedRoute path={`${path}/users/update/:id`} component={UpdateUser} />
            {/* Add the routes for Roles */}
            <ProtectedRoute path={`${path}/roles`} component={RoleList} />
            {/* Add the routes for Modules */}
            <ProtectedRoute path={`${path}/modules`} component={ModuleList} />
            <ProtectedRoute path={`${path}/product-tags`} component={ProductTags} /> {/* Add route for ProductTags */}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
