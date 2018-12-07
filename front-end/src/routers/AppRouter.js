import React from 'react';
import { Router, Route, Switch, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import HomePage from '../components/HomePage';
import DealPage from '../components/DealPage';
import SubmitDealPage from '../components/SubmitDealPage';
import Header from '../components/Header';
import ProfilePage from '../components/ProfilePage';
import EmailVerificationRequestPage from '../components/login-register/EmailVerificationRequestPage';
import EmailVerificationPage from '../components/login-register/EmailVerificationPage';
import PasswordChangePage from '../components/login-register/ChangePasswordPage';
import RequestPasswordChangePage from '../components/login-register/RequestPasswordChangePage';

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

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch(`${window.BACKEND_PATH}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data && data.id) {
            fetch(`${window.BACKEND_PATH}/profile/${data.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: token
              }
            })
              .then(resp => resp.json())
              .then(user => {
                if (user && user.email) {
                  this.loadUser(user);
                }
              });
          }
        })
        .catch(console.log);
    }
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
            <PublicRoute path="/deals/:deal_id" component={DealPage} />
            <PublicRoute path="/profile/:username" component={ProfilePage} />
            <PublicRoute path="/complete-signup-request" component={EmailVerificationRequestPage} />
            <PublicRoute path="/complete-signup/:token" component={EmailVerificationPage} />
            <PublicRoute path="/forgot-password-request" component={RequestPasswordChangePage} />
            <PublicRoute path="/reset-password/:token" component={PasswordChangePage} />
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
