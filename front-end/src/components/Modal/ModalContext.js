import React, { Component, createContext } from 'react';

const ModalContext = createContext({
  component: null,
  props: {},
  showModal: () => {},
  hideModal: () => {}
});

export class ModalProvider extends Component {
  // shows the modal
  showModal = (component, props = {}) => {
    this.setState({
      component,
      props
    });
  };

  // hides the modal
  hideModal = () =>
    this.setState({
      component: null,
      props: {}
    });

  // register
  onSubmitRegister = (values, setErrors, setSubmitting) => {
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
  };

  onSubmitLogin = (values, setErrors, setSubmitting) => {
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
  };

  // state to inject into the provider
  state = {
    component: null,
    props: {},
    showModal: this.showModal,
    hideModal: this.hideModal,
    onSubmitRegister: this.onSubmitRegister,
    onSubmitLogin: this.onSubmitLogin
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
