import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import SVGbutton from './SVGbutton';
import SVGicon from './SVGicon';
import ButtonText from './ButtonText';

const MenuList = styled.div`
  position: relative;
  z-index: 10;
`;

const ButtonList = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;

  background-color: white;
  border: 1px solid black;
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

const Title = styled.h2`
  padding: 0.5rem;
  margin: 0;
  line-height: 2rem;
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
            className="menu"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            <ButtonList>
              {isMobile ? <Title>{userState.username}</Title> : null}
              <button
                type="button"
                onClick={() => {
                  history.push(`/profile/${userState.username}`);
                }}
              >
                Profile
              </button>
              <button type="button" onClick={() => userState.signOut()}>
                Sign out
              </button>
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
