import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import SVGbutton from './SVGbutton';
import SearchSVGbutton from './SearchSVGButton';
import SVGicon from './SVGicon';
import ButtonText from './ButtonText';

const SearchContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 201;
  background-color: var(--green);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;

  font-weight: 600;
  margin: 0 auto;
  padding: 0 1rem 0 1rem; /* m-size */
  max-width: 124rem;
`;

const SearchInput = styled.input`
  flex: 1 1 auto;

  outline: none;
  font-size: 2.2rem;
  height: 4rem;
  min-width: 170px;
  margin: 1rem 0;
  padding: 0.5rem;
  border: 2px solid grey;
  border-radius: 10px 0 0 10px;

  &:focus {
    border: 2px solid var(--red);
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

const CloseSVGbutton = styled.button`
  outline: none;
  border: none;
  margin-left: 2rem;
  background-color: transparent;
  background-repeat: no-repeat;

  &:hover path:nth-child(odd),
  &:focus path:nth-child(odd) {
    stroke: var(--red);
  }
`;

const CrossSVGicon = styled.svg`
  height: 22px;

  path:nth-child(odd) {
    transition: stroke 0.5s;
    stroke: white;
    stroke-dashoffset: 0;
  }

  &:hover path:nth-child(odd) {
    stroke: red;
  }
`;

const CrossSVGPath = styled.path`
  stroke-width: 20px;
  fill: none;
`;

class SearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      searchField: ''
    };

    this.abstractedCloseMenu = this.abstractedCloseMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.closeMenuCross = this.closeMenuCross.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  abstractedCloseMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.abstractedCloseMenu();
    }
  }

  closeMenuCross(event) {
    event.preventDefault();
    this.abstractedCloseMenu();
  }

  handleSearchChange(event) {
    this.setState({ searchField: event.target.value });
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    const { history } = this.props;
    const { searchField } = this.state;
    console.log(encodeURIComponent(searchField));
    const encodedSearchField = encodeURIComponent(searchField);
    history.push(`/?search=${encodeURIComponent(encodedSearchField)}`); // history.push automatically decodes once.
    this.setState({ searchField: '' });
  }

  keyPress(event) {
    if (event.keyCode === 27) {
      this.abstractedCloseMenu();
    } else if (event.keyCode === 13) {
      this.handleSearchSubmit(event);
    }
  }

  render() {
    const { isMobile } = this.props;
    const { searchField } = this.state;

    return (
      <div>
        <SVGbutton onClick={this.showMenu}>
          {isMobile ? null : <ButtonText>Search</ButtonText>}
          <SVGicon viewBox="0 0 136 136">
            <CircleSVGComponent
              shape-rendering="geometricPrecision"
              transform="rotate(135 55 55)"
              d="M 55 1 a 50 50 0 1 0 0.001 0"
            />
            <CircleSVGComponent
              shape-rendering="geometricPrecision"
              transform="rotate(135 55 55)"
              d="M 55 1 a 50 50 0 1 0 0.001 0"
            />
            <LineSVGPath
              shape-rendering="geometricPrecision"
              transform="rotate(135 55 55)"
              d="M55 -1 L55 -45"
            />
            <LineSVGPath
              shape-rendering="geometricPrecision"
              transform="rotate(135 55 55)"
              d="M55 -1 L55 -45"
            />
          </SVGicon>
        </SVGbutton>
        {this.state.showMenu ? (
          <SearchContainer
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            <InputContainer>
              <SearchInput
                autoFocus
                placeholder="I'm looking for..."
                value={searchField}
                onChange={this.handleSearchChange}
                onKeyDown={this.keyPress}
              />
              <SearchSVGbutton type="button" onClick={this.handleSearchSubmit}>
                <SVGicon viewBox="0 0 136 136">
                  <CircleSVGComponent
                    shape-rendering="geometricPrecision"
                    transform="rotate(135 55 55)"
                    d="M 55 1 a 50 50 0 1 0 0.001 0"
                  />
                  <CircleSVGComponent
                    shape-rendering="geometricPrecision"
                    transform="rotate(135 55 55)"
                    d="M 55 1 a 50 50 0 1 0 0.001 0"
                  />
                  <LineSVGPath
                    shape-rendering="geometricPrecision"
                    transform="rotate(135 55 55)"
                    d="M55 -1 L55 -45"
                  />
                  <LineSVGPath
                    shape-rendering="geometricPrecision"
                    transform="rotate(135 55 55)"
                    d="M55 -1 L55 -45"
                  />
                </SVGicon>
              </SearchSVGbutton>

              <CloseSVGbutton onClick={this.closeMenuCross}>
                <CrossSVGicon viewBox="0 0 160 160">
                  <CrossSVGPath shape-rendering="geometricPrecision" d="M0 0 L160 160" />
                  <path />
                  <CrossSVGPath shape-rendering="geometricPrecision" d="M160 0 L0 160" />
                  <path />
                </CrossSVGicon>
              </CloseSVGbutton>
            </InputContainer>
          </SearchContainer>
        ) : null}
      </div>
    );
  }
}

SearchComponent.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(SearchComponent);
