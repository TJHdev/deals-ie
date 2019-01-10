import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BackdropDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

const backdrop = props => {
  const { click } = props;
  return <BackdropDiv onClick={click} />;
};

export default backdrop;

backdrop.propTypes = {
  click: PropTypes.func.isRequired
};
