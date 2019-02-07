import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SVGbutton from '../SVGbutton';
import SVGicon from '../SVGicon';
import ButtonText from '../ButtonText';

const LineSVGPath = styled.path`
  transition: stroke 0.7s, stroke-dashoffset 0.7s, opacity 0.3s;
  stroke-width: 20px;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 140 140;
  stroke-dashoffset: 140;
`;

const DisabledSVGbutton = styled(SVGbutton)`
  background-color: grey;
  color: lightgray;
`;

const drawerToggleButton = props => {
  const { click, isMobile } = props;
  return (
    <DisabledSVGbutton onClick={click}>
      {isMobile ? null : <ButtonText>Menu</ButtonText>}

      <SVGicon viewBox="0 0 160 160">
        <LineSVGPath d="M10 30 L150 30" />
        <LineSVGPath d="M10 30 L150 30" />

        <LineSVGPath d="M10 80 L150 80" />
        <LineSVGPath d="M10 80 L150 80" />

        <LineSVGPath d="M10 130 L150 130" />
        <LineSVGPath d="M10 130 L150 130" />
      </SVGicon>
    </DisabledSVGbutton>
  );
};

export default drawerToggleButton;

drawerToggleButton.propTypes = {
  click: PropTypes.func.isRequired
};
