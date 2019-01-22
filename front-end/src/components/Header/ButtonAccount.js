import React from 'react';
import styled from 'styled-components';

import SVGbutton from './SVGbutton';
import SVGicon from './SVGicon';
import ButtonText from './ButtonText';

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

const ButtonAccount = props => {
  const { isMobile, userState } = props;

  return (
    <SVGbutton type="button" onClick={() => userState.signOut()}>
      {isMobile ? null : <ButtonText>Account</ButtonText>}
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
  );
};

export default ButtonAccount;
