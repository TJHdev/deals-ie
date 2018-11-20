import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import RegisterModal from './RegisterPage';
import LoginModal from './LoginPage';

import ContentContainer from '../styled-components/ContentContainer';

const NavbarHeader = styled.header`
  background-color: var(--blue);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0; /* was $s-sizeS */
`;

const HeaderTitle = styled(Link)`
  color: white;
  text-decoration: none;
`;

const HeaderText = styled.h1`
  margin: 0;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SearchContainer = styled.div``;

const SearchField = styled.input``;

const NavSearch = styled.button``;

const NavAnchor = styled(Link)``;

class Header extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isRegisterModal: false,
      isLoginModal: false
    };
    this.handleOpenRegisterModal = this.handleOpenRegisterModal.bind(this);
    this.handleCloseRegisterModal = this.handleCloseRegisterModal.bind(this);
    this.handleOpenLoginModal = this.handleOpenLoginModal.bind(this);
    this.handleCloseLoginModal = this.handleCloseLoginModal.bind(this);
    this.switchModal = this.switchModal.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
  }

  onSubmitLogin(values) {
    const { history } = this.props;
    fetch(`${window.BACKEND_PATH}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        window.sessionStorage.setItem('token', data.token);
        if (!data.userId || data.success !== 'true') {
          console.log('Problem logging in');
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
            console.log(user);
            if (user && user.email) {
              this.handleCloseLoginModal(); // if login succesful close the
              // loadUser(user);
              history.push('/');
              // onRouteChange('home');
            }
          })
          .catch(console.log);
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

  render() {
    const { isRegisterModal, isLoginModal } = this.state;
    return (
      <NavbarHeader>
        <ContentContainer>
          <HeaderContent>
            <HeaderTitle to="/">
              <HeaderText>Bargain Republic</HeaderText>
            </HeaderTitle>
            <NavContent>
              <SearchContainer>
                <SearchField />
                <NavSearch>Search</NavSearch>
              </SearchContainer>
              <NavAnchor to="submit">
                <button type="button">Submit Deal</button>
              </NavAnchor>

              <button type="button" onClick={this.handleOpenRegisterModal}>
                Join
              </button>
            </NavContent>
          </HeaderContent>
        </ContentContainer>
        <RegisterModal
          isRegisterModal={isRegisterModal}
          handleCloseRegisterModal={this.handleCloseRegisterModal}
          switchModal={this.switchModal}
        />
        <LoginModal
          isLoginModal={isLoginModal}
          handleCloseLoginModal={this.handleCloseLoginModal}
          switchModal={this.switchModal}
          onSubmitLogin={this.onSubmitLogin}
        />
      </NavbarHeader>
    );
  }
}

export default withRouter(Header);

// <NavLink to="/create" activeClassName="is-active">Create expense</NavLink>
// <NavLink to="/help" activeClassName="is-active">Help</NavLink>
