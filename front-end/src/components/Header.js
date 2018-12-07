import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import RegisterModal from './login-register/RegisterPage';
import LoginModal from './login-register/LoginPage';

import ContentContainer from '../styled-components/ContentContainer';
// import EireDealsLogo from '../../public/images/EireDealsLogo.png'

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
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
  }

  onSubmitRegister(values, setErrors) {
    const { history, loadUser } = this.props;
    fetch(`${window.BACKEND_PATH}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data && data.email) {
          // loadUser(data);
          this.handleCloseRegisterModal();
          history.push('/complete-signup-request');
        } else {
          setErrors(data.error);
        }
      })
      .catch(console.log);
  }

  onSubmitLogin(values, setErrors) {
    const { history, loadUser } = this.props;
    fetch(`${window.BACKEND_PATH}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.sessionStorage.setItem('token', data.token);
        if (!data.userId || data.success !== 'true') {
          console.log('Problem logging in');
          setErrors(data.error);
          return null;
        }
        loadUser(data);
        return fetch(`${window.BACKEND_PATH}/profile/${data.userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: data.token
          }
        })
          .then(resp => resp.json())
          .then(data => {
            console.log(data);
            if (data && data.email) {
              this.handleCloseLoginModal(); // if login succesful close the modal
              history.push('/');
            } else {
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
              <LogoImg src="/images/EireDealsLogo.png" alt="Eiredeals logo" />
              <HeaderText>Éire Deals</HeaderText>
            </HeaderTitle>
            <NavContent>
              <SearchContainer>
                <SearchField placeholder="Search for brands, models, products etc" />
                <HeaderButton>Search</HeaderButton>
              </SearchContainer>
              <NavAnchor to="/deals">
                <HeaderButton type="button">Submit Deal</HeaderButton>
              </NavAnchor>

              <HeaderButton type="button" onClick={this.handleOpenRegisterModal}>
                Join
              </HeaderButton>
            </NavContent>
          </HeaderContent>
        </ContentContainer>
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
      </NavbarHeader>
    );
  }
}

const NavbarHeader = styled.header`
  background-color: var(--green);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0; /* was $s-sizeS */
`;

const LogoImg = styled.img`
  margin-right: 1rem;
  height: 40px;
`;

const HeaderTitle = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
`;

const HeaderText = styled.h1`
  display: inline-block;
  margin: 0;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SearchContainer = styled.div``;

const SearchField = styled.input`
  border: 4px solid var(--green);
  padding: 0.7rem;
  border-radius: 15px;
  outline: none;
  width: 330px;
  transition: all 0.4s;

  &:active,
  &:focus {
    border: 4px solid var(--red);
  }
`;

const NavAnchor = styled(Link)``;

const HeaderButton = styled.button`
  background-color: var(--red);
  color: white;
  font-size: var(--font-size-large);
  font-weight: 300;
  border: none;
  border-radius: 5px;
  padding: var(--xs-size);
  /* margin: var(--xs-size) 0; */
  margin-left: var(--xs-size);

  display: inline-block;
  text-decoration: none;
  line-height: 1; // dictates the height of a button
  transition: all 0.2s;

  &:hover {
    /* background-color: lighten(var(--green), 10%); */
    /* filter: brightness(50%); */
    transform: translateY(-2px);
    /* background-color: var(--green-lightened); */
    box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.7);
  }

  &:active {
    box-shadow: none;
    transform: translateY(2px);
  }
`;

export default withRouter(Header);

// <NavLink to="/create" activeClassName="is-active">Create expense</NavLink>
// <NavLink to="/help" activeClassName="is-active">Help</NavLink>
