import React from 'react';
import { Switch, Link, useRouteMatch } from 'react-router-dom';
import './Dashboard.css'; // Import the new CSS file
import StoreList from './StoreList'; // Import the StoreList component
import Products from './Products'; // Import the Products component
import Orders from './Orders'; // Import the Orders component
import Settings from './Settings'; // Import the Settings component
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

const Dashboard = () => {
  let { path, url } = useRouteMatch();

  return (
    <div className="dashboard">
      <div className="sidebar fixed">
        <h2>Sidebar</h2>
        <ul>
          <li><Link to={`${url}/stores`}>Stores</Link></li>
          <li><Link to={`${url}/products`}>Products</Link></li>
          <li><Link to={`${url}/orders`}>Orders</Link></li>
          <li><Link to={`${url}/settings`}>Settings</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <div className="topbar fixed">
          <h2>Dashboard Top Menu</h2>
        </div>
        <div className="content">
          <Switch>
            <ProtectedRoute path={`${path}/stores`} component={StoreList} />
            <ProtectedRoute path={`${path}/products`} component={Products} />
            <ProtectedRoute path={`${path}/orders`} component={Orders} />
            <ProtectedRoute path={`${path}/settings`} component={Settings} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
