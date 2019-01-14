import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import HomePage from '../components/HomePage';
import DealPage from '../components/DealPage';
import SubmitDealPage from '../components/SubmitDealPage';
import NoMatch from '../components/NoMatch.js';
import Header from '../components/Header';
import ProfilePage from '../components/ProfilePage';
import EmailVerificationRequestPage from '../components/login-register/EmailVerificationRequestPage';
import EmailVerificationPage from '../components/login-register/EmailVerificationPage';
import PasswordChangePage from '../components/login-register/ChangePasswordPage';
import RequestPasswordChangePage from '../components/login-register/RequestPasswordChangePage';

import SideDrawer from '../components/Burger-Menu/SideDrawer';
import Backdrop from '../components/Burger-Menu/Backdrop';

// import DashboardPage from '../components/DashboardPage';
// import NotFoundPage from '../components/NotFoundPage';
// import LoginPage from '../components/LoginPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

// modal context imports
import { ModalProvider, ModalRoot } from '../components/Modal/ModalContext';

// user context imports
import { UserProvider, UserConsumer } from '../components/User/UserContext';

const history = createHistory();

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false
    };
  }

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <Router history={history}>
        <UserProvider history={history}>
          <UserConsumer>
            {userState => (
              <Fragment>
                <ModalProvider userState={userState} history={history}>
                  <Header
                    userState={userState}
                    drawerClickHandler={this.drawerToggleClickHandler}
                  />
                  <ModalRoot />
                  <SideDrawer show={this.state.sideDrawerOpen} />
                  {backdrop}

                  <Switch>
                    <Route exact path="/" component={HomePage} userState={userState} />
                    <Route
                      exact
                      path="/deals/:deal_id"
                      component={DealPage}
                      userState={userState}
                    />
                    <Route path="/profile/:username" component={ProfilePage} />
                    <Route
                      path="/complete-signup-request"
                      component={EmailVerificationRequestPage}
                    />
                    <Route path="/complete-signup/" component={EmailVerificationPage} />
                    <Route path="/password-request" component={RequestPasswordChangePage} />
                    <Route path="/reset-password" component={PasswordChangePage} />
                    <PrivateRoute
                      exact
                      path="/deals"
                      component={SubmitDealPage}
                      userState={userState}
                    />
                    <Route component={NoMatch} />
                  </Switch>
                </ModalProvider>
              </Fragment>
            )}
          </UserConsumer>
        </UserProvider>
      </Router>
    );
  }
}

// <PublicRoute exact path="/" component={HomePage} />
// <PublicRoute exact path="/deals/:deal_id" component={DealPage} />
// <PublicRoute path="/profile/:username" component={ProfilePage} />
// <PublicRoute
//   path="/complete-signup-request"
//   component={EmailVerificationRequestPage}
// />
// <PublicRoute path="/complete-signup/" component={EmailVerificationPage} />
// <PublicRoute path="/password-request" component={RequestPasswordChangePage} />
// <PublicRoute path="/reset-password" component={PasswordChangePage} />
// <PrivateRoute
//   exact
//   path="/deals"
//   component={SubmitDealPage}
//   userState={userState}
// />
// <PublicRoute component={NoMatch} />

export default AppRouter;

// <Route path="/login" component={LoginPage} />
// <Route path="/register" component={RegisterPage} />
