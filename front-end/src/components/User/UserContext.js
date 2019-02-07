import React, { Component, createContext } from 'react';
import { navigate } from '@reach/router';

const UserContext = createContext({
  id: null,
  username: null,
  email: null,
  admin: false,
  trusted: false,
  email_verified: false
});

export class UserProvider extends Component {
  constructor(props) {
    super(props);
  }

  // shows the modal
  loadUser = ({ id, username, email, admin, trusted, email_verified }) => {
    this.setState({
      id,
      username,
      email,
      admin,
      trusted,
      email_verified
    });
  };

  // hides the modal
  unloadUser = () => {
    this.setState({
      id: null,
      username: null,
      email: null,
      admin: false,
      trusted: false,
      email_verified: false
    });
  };

  signOut = () => {
    const token = window.sessionStorage.getItem('token');

    fetch(`${window.BACKEND_PATH}/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data !== 'unauthorized' && this.state.id !== null) {
          this.unloadUser();
          navigate('/no-route/');
          // remountes the homePage to ensure that data is refetched
          setTimeout(() => {
            navigate('/');
          }, 100);
        } else {
          console.log('Something went wrong signing out');
        }
      })
      .catch(console.log);
  };

  // state to inject into the provider
  state = {
    id: null,
    username: null,
    email: null,
    admin: false,
    trusted: false,
    email_verified: false,
    loadUser: this.loadUser,
    signOut: this.signOut
  };

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
                  if (!this.state.email) {
                    this.loadUser({ ...user });
                  }
                }
              });
          }
        })
        .catch(console.log);
    }
  }

  render() {
    return <UserContext.Provider value={this.state}>{this.props.children}</UserContext.Provider>;
  }
}

export const UserConsumer = UserContext.Consumer;
