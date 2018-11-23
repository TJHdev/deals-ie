import React from 'react';
import { Router, Route, Switch, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import HomePage from '../components/Home';
import SubmitDealPage from '../components/SubmitDealPage';
import Header from '../components/Header';

// import DashboardPage from '../components/DashboardPage';
// import NotFoundPage from '../components/NotFoundPage';
// import LoginPage from '../components/LoginPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
    this.loadUser = this.loadUser.bind(this);
  }

  loadUser(user) {
    if (user) {
      this.setState({ isAuthenticated: true });
      console.log('Loading the user from AppRouter');
    } else {
      console.log('No valid user provided');
    }
  }

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Router history={history}>
        <div>
          <Header loadUser={this.loadUser} />
          <Switch>
            <PublicRoute exact path="/" component={HomePage} />

            <PrivateRoute
              path="/deals"
              component={SubmitDealPage}
              isAuthenticated={isAuthenticated}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default AppRouter;

// <Route path="/login" component={LoginPage} />
// <Route path="/register" component={RegisterPage} />
