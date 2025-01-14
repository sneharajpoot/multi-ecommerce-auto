import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import DashboardHome from './DashboardHome';
import StoreManagement from './StoreManagement';
import UserManagement from './UserManagement';

const DashboardLayout = () => {
  return (
    <Router>
      <div className="dashboard-layout">
        <Sidebar />
        <div className="main-content">
          <Topbar />
          <div className="content-area">
            <Switch>
              <Route path="/dashboard" exact component={DashboardHome} />
              <Route path="/dashboard/store-management" component={StoreManagement} />
              <Route path="/dashboard/user-management" component={UserManagement} />
              {/* Add more routes as needed */}
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default DashboardLayout;
