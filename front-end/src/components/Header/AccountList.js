import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import SVGbutton from './SVGbutton';
import SVGicon from './SVGicon';
import ButtonText from './ButtonText';

const MenuList = styled.div`
  position: relative;
  z-index: 10;
`;

const ButtonList = styled.div`
  max-width: 250px;
  position: absolute;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background-color: white;
  border: 1px solid var(--red);
  border-radius: 5px;
  margin-top: 2px;
  padding: 0.5rem;
  box-shadow: 0px 3px 7px 0 rgba(0, 0, 0, 0.7);
`;

const Title = styled.h2`
  font-size: 1.7rem;
  padding: 0.5rem;
  margin: 0;
  line-height: 2rem;
`;

const TitleRule = styled.hr`
  width: 100%;
  border: 0;
  height: 1px;
  background: linear-gradient(to left, #eee, var(--red), #eee);
  margin-bottom: 0.5rem;
`;

const MenuItem = styled.button`
  border: none;
  border-radius: 5px;
  background-color: white;
  margin: 0.3rem;
  padding: 0.5rem;

  &:hover {
    background-color: #ddd;
  }
`;

const LineSVGPath = styled.path`
  transition: stroke 1.5s, stroke-dashoffset 1.5s, opacity 0.3s;
  stroke-width: 20px;
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: 192 192;
  stroke-dashoffset: 192;
`;

const CircleSVGComponent = styled.path`
  transition: stroke 1.5s, stroke-dashoffset 1.5s, opacity 0.3s;
  stroke-width: 16px;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 314.1593 314.1593;
  stroke-dashoffset: 314.1593;
`;

class Card extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }

  render() {
    const { userState, isMobile, history } = this.props;

    return (
      <div>
        <SVGbutton onClick={this.showMenu}>
          {isMobile ? null : <ButtonText>{userState.username}</ButtonText>}
          <SVGicon viewBox="0 0 160 160">
            <LineSVGPath
              shape-rendering="geometricPrecision"
              d="M15,160 C20,135 40,110 50,110 C70,123 90,123 110,110 C120,110 140,135 145,160"
            />
            <LineSVGPath
              shape-rendering="geometricPrecision"
              d="M15,160 C20,135 40,110 50,110 C70,123 90,123 110,110 C120,110 140,135 145,160"
            />
            <CircleSVGComponent
              shape-rendering="geometricPrecision"
              d="M 80 10 a 50 50 0 1 0 0.001 0"
            />
            <CircleSVGComponent
              shape-rendering="geometricPrecision"
              d="M 80 10 a 50 50 0 1 0 0.001 0"
            />
          </SVGicon>
        </SVGbutton>
        {this.state.showMenu ? (
          <MenuList
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            <ButtonList>
              {isMobile ? (
                <Fragment>
                  <Title>{userState.username}</Title>
                  <TitleRule />
                </Fragment>
              ) : null}
              <MenuItem
                type="button"
                onClick={() => {
                  history.push(`/profile/${userState.username}`);
                }}
              >
                Profile
              </MenuItem>
              <MenuItem type="button" onClick={() => userState.signOut()}>
                Sign out
              </MenuItem>
            </ButtonList>
          </MenuList>
        ) : null}
      </div>
    );
  }
}

Card.propTypes = {
  userState: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(Card);
