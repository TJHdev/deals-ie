import React from 'react';
import { Router, Route, Switch, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import HomePage from '../components/Home';
import SubmitDealPage from '../components/SubmitDealPage';
import Header from '../components/Header';

// import DashboardPage from '../components/DashboardPage';
// import NotFoundPage from '../components/NotFoundPage';
// import LoginPage from '../components/LoginPage';
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/submit" component={SubmitDealPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

// <Route path="/login" component={LoginPage} />
// <Route path="/register" component={RegisterPage} />

/*

      <Switch>
        <PublicRoute  component={LoginPage} exact />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <Route component={NotFoundPage} />
      </Switch>

*/
