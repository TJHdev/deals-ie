import React from 'react';
import PropTypes from 'prop-types';
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

import RegisterModal from '../components/login-register/RegisterPage';
import LoginModal from '../components/login-register/LoginPage';

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
      isAuthenticated: false,
      isRegisterModal: false,
      isLoginModal: false
    };
    this.loadUser = this.loadUser.bind(this);

    // modals
    this.handleOpenRegisterModal = this.handleOpenRegisterModal.bind(this);
    this.handleCloseRegisterModal = this.handleCloseRegisterModal.bind(this);
    this.handleOpenLoginModal = this.handleOpenLoginModal.bind(this);
    this.handleCloseLoginModal = this.handleCloseLoginModal.bind(this);
    this.switchModal = this.switchModal.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
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

  // shouldComponentUpdate() {
  //   return false; // Will cause component to never re-render.
  // }

  onSubmitRegister(values, setErrors, setSubmitting) {
    setSubmitting(true);
    const { loadUser } = this.props;
    fetch(`${window.BACKEND_PATH}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        setSubmitting(false);
        console.log(data);
        if (data && data.email) {
          this.handleCloseRegisterModal();
          history.push('/complete-signup-request');
        } else {
          setErrors(data.error);
        }
      })
      .catch(err => {
        setSubmitting(false);
        console.log(err);
      });
  }

  onSubmitLogin(values, setErrors, setSubmitting) {
    setSubmitting(true);

    fetch(`${window.BACKEND_PATH}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        setSubmitting(false);
        // console.log(data);
        window.sessionStorage.setItem('token', data.token);
        if (!data.userId || data.success !== 'true') {
          console.log('Problem logging in');
          setErrors(data.error);
          return null;
        }
        this.loadUser(data);
        return fetch(`${window.BACKEND_PATH}/profile/${data.userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: data.token
          }
        })
          .then(resp => resp.json())
          .then(user => {
            setSubmitting(false);
            if (user && user.email) {
              this.handleCloseLoginModal(); // if login succesful close the modal
              history.push('/');
            } else {
            }
          })
          .catch(err => {
            setSubmitting(false);
            console.log(err);
          });
      })
      .catch(err => {
        setSubmitting(false);
        console.log(err);
      });
  }

  handleOpenRegisterModal() {
    this.setState(() => ({ isRegisterModal: true }));
  }

  handleCloseRegisterModal() {
    this.setState(() => ({ isRegisterModal: false }));
  }

  handleOpenLoginModal() {
    this.setState(() => ({ isLoginModal: true }));
  }

  handleCloseLoginModal() {
    this.setState(() => ({ isLoginModal: false }));
  }

  switchModal() {
    const { isRegisterModal, isLoginModal } = this.state;

    this.setState({
      isRegisterModal: !isRegisterModal,
      isLoginModal: !isLoginModal
    });
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
    const { isAuthenticated, isRegisterModal, isLoginModal } = this.state;

    return (
      <div>
        <Router history={history}>
          <div>
            <Header
              loadUser={this.loadUser}
              handleOpenRegisterModal={this.handleOpenRegisterModal}
            />
            <RegisterModal
              isRegisterModal={isRegisterModal}
              handleCloseRegisterModal={this.handleCloseRegisterModal}
              switchModal={this.switchModal}
              onSubmitRegister={this.onSubmitRegister}
            />
            <LoginModal
              isLoginModal={isLoginModal}
              handleCloseLoginModal={this.handleCloseLoginModal}
              switchModal={this.switchModal}
              onSubmitLogin={this.onSubmitLogin}
            />
            <Switch>
              <PublicRoute exact path="/" component={HomePage} />
              <PublicRoute path="/deals/:deal_id" component={DealPage} />
              <PublicRoute path="/profile/:username" component={ProfilePage} />
              <PublicRoute
                path="/complete-signup-request"
                component={EmailVerificationRequestPage}
              />
              <PublicRoute path="/complete-signup/" component={EmailVerificationPage} />
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
      </div>
    );
  }
}

export default AppRouter;

// <Route path="/login" component={LoginPage} />
// <Route path="/register" component={RegisterPage} />
