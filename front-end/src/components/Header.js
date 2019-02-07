import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Link, Redirect, withRouter } from 'react-router-dom';
import { Link } from '@reach/router';
import styled from 'styled-components';
import RegisterModal from './Modal/RegisterModal';

// context api test
import { ModalConsumer } from './Modal/ModalContext';

import ContentContainer from '../styled-components/ContentContainer';

// burger menu
import DrawerToggleButton from './Header/Burger-Menu/DrawToggleButton';
import ButtonSearch from './Header/ButtonSearch';
import SearchComponent from './Header/SearchComponent';
import ButtonShare from './Header/ButtonShare';
import ButtonJoin from './Header/ButtonJoin';
// import ButtonAccount from './Header/ButtonAccount'; replaced with dropdown
import AccountList from './Header/AccountList';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { width: window.innerWidth };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 800;
    const { drawerClickHandler, userState } = this.props;

    return isMobile ? (
      <NavbarHeader>
        <ContentContainer>
          <HeaderContent>
            <DrawerToggleButton disabled isMobile={isMobile} />
            <SearchComponent isMobile={isMobile} />
            <HeaderTitle to="/">
              <LogoImg src="/images/EireDealsLogo.png" alt="Eiredeals logo" />
              <HeaderText>Éire Deals</HeaderText>
            </HeaderTitle>
            <ButtonShare isMobile={isMobile} title="Share Deal" />
            <ModalConsumer>
              {({ showModal }) => {
                return userState.id ? (
                  <AccountList isMobile={isMobile} userState={userState} />
                ) : (
                  <ButtonJoin isMobile={isMobile} showModal={showModal} />
                );
              }}
            </ModalConsumer>
          </HeaderContent>
        </ContentContainer>
      </NavbarHeader>
    ) : (
      <NavbarHeader>
        <ContentContainer>
          <HeaderContent>
            <HeaderTitle to="/">
              <LogoImg src="/images/EireDealsLogo.png" alt="Eiredeals logo" />
              <HeaderText>Éire Deals</HeaderText>
            </HeaderTitle>
            <NavContent>
              <DrawerToggleButton disabled />

              <SearchComponent />
              <ButtonShare />
              <ModalConsumer>
                {({ showModal }) => {
                  return userState.id ? (
                    <AccountList userState={userState} />
                  ) : (
                    <ButtonJoin showModal={showModal} />
                  );
                }}
              </ModalConsumer>
            </NavContent>
          </HeaderContent>
        </ContentContainer>
      </NavbarHeader>
    );
  }
}

// <HeaderButton type="button" onClick={() => showModal(RegisterModal)}>
// <HeaderButtonSpan>Join</HeaderButtonSpan>
// <HeaderButtonImg src="/images/icons8-user-48.png" />
// </HeaderButton>

const HeaderButtonSpan = styled.span`
  margin-right: 5px;
`;

const HeaderButtonImg = styled.img`
  height: 15px;
`;

const HeaderButtonSvg = styled.img`
  height: 20px;
`;

const SVGObjectIcon = styled.object`
  height: 200px;
  /* padding: 1rem; */
  /* cursor: pointer; */

  & path {
  }
`;

const NavbarHeader = styled.header`
  background-color: var(--green);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0; /* was $s-sizeS */
`;

//***********
// Logo block
//***********

const HeaderTitle = styled(Link)`
  border-radius: 10px;
  padding: 0.5rem;

  display: flex;
  flex: 0 1 auto;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;

  &:hover {
    background-color: var(--green-dark);
  }
`;

const LogoImg = styled.img`
  margin-right: 1rem;
  height: 45px;

  @media (max-width: 500px) {
    margin-right: 0.5rem;
  }
`;

const HeaderText = styled.h1`
  font-family: UncialAntiqua;
  letter-spacing: 1px;
  margin: 0;
  font-size: 3.1rem;
  line-height: 2rem;
  flex: 0 0 auto;
  width: auto;

  @media (max-width: 850px) {
    font-size: 2.5rem;
    line-height: 120%;
  }

  @media (max-width: 500px) {
    font-size: 1.8rem;
    line-height: 120%;
    width: 63px;
  }
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
  width: 180px;
  transition: all 0.4s;

  &:active,
  &:focus {
    border: 4px solid var(--red);
  }

  &:active + svg g path,
  &:hover ~ svg p path {
    fill: black;
    stroke: black;
    transition: all 0.3s;
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

export default Header;

// <NavLink to="/create" activeClassName="is-active">Create expense</NavLink>
// <NavLink to="/help" activeClassName="is-active">Help</NavLink>
