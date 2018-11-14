import React from 'react';
import { Link } from 'react-router-dom';
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

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegisterModal: false,
      isLoginModal: false
    };
    this.handleOpenRegisterModal = this.handleOpenRegisterModal.bind(this);
    this.handleCloseRegisterModal = this.handleCloseRegisterModal.bind(this);
    this.handleOpenLoginModal = this.handleOpenLoginModal.bind(this);
    this.handleCloseLoginModal = this.handleCloseLoginModal.bind(this);
    this.switchModal = this.switchModal.bind(this);
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
        />
      </NavbarHeader>
    );
  }
}

// <NavLink to="/create" activeClassName="is-active">Create expense</NavLink>
// <NavLink to="/help" activeClassName="is-active">Help</NavLink>
