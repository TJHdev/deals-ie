import React, { Component, createContext } from 'react';
// import { UserConsumer } from '../User/UserContext';
import { navigate } from '@reach/router';

const ModalContext = createContext({
  component: null,
  props: {},
  showModal: () => {},
  hideModal: () => {},
  onSubmitRegister: () => {},
  onSubmitLogin: () => {}
});

export class ModalProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      component: null,
      props: {},
      showModal: this.showModal,
      hideModal: this.hideModal,
      onSubmitRegister: this.onSubmitRegister,
      onSubmitLogin: this.onSubmitLogin
    };
  }

  showModal = (component, props = {}) => {
    this.setState({
      component,
      props
    });
  };

  hideModal = () =>
    this.setState({
      component: null,
      props: {}
    });

  // register
  onSubmitRegister = (values, setErrors, setSubmitting) => {
    setSubmitting(true);
    // const { history } = this.props;

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
          this.hideModal();

          //send request for verification email
          fetch(`${window.BACKEND_PATH}/profile/request-verify-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: values.email })
          })
            .then(response => response.json())
            .then(data => {
              return;
            })
            .catch(err => {
              console.log('Something went wrong requesting a verification email');
              return;
            });

          navigate('/complete-signup-request');
          // history.push('/complete-signup-request');
        } else {
          setErrors(data.error);
        }
      })
      .catch(err => {
        setSubmitting(false);
        console.log(err);
      });
  };

  // login
  onSubmitLogin = (values, setErrors, setSubmitting) => {
    setSubmitting(true);
    const { loadUser } = this.props.userState;
    // const { history } = this.props;

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
              loadUser({ ...user });
              this.hideModal(); // if login succesful close the modal
              // history.push('/no-route/');
              // history.goBack();
              navigate('/no-route/');
              // remountes the homePage to ensure that data is refetched
              setTimeout(() => {
                navigate('/');
              }, 100);
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
  };

  render() {
    return <ModalContext.Provider value={this.state}>{this.props.children}</ModalContext.Provider>;
  }
}

export const ModalConsumer = ModalContext.Consumer;

export const ModalRoot = () => (
  <ModalConsumer>
    {({ component: Component, props, hideModal, onSubmitRegister, onSubmitLogin }) =>
      Component ? (
        <Component
          {...props}
          onSubmitRegister={onSubmitRegister}
          onSubmitLogin={onSubmitLogin}
          onRequestClose={hideModal}
        />
      ) : null
    }
  </ModalConsumer>
);
