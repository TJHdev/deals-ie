import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BurgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 24px;
  width: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

const BurgerLine = styled.div`
  width: 30px;
  height: 2px;
  background: white;
`;

const drawerToggleButton = props => {
  const { click } = props;
  return (
    <BurgerButton onClick={click}>
      <BurgerLine />
      <BurgerLine />
      <BurgerLine />
    </BurgerButton>
  );
};

export default drawerToggleButton;

drawerToggleButton.propTypes = {
  click: PropTypes.func.isRequired
};
