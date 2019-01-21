import React from 'react';
import styled from 'styled-components';

import SVGbutton from './SVGbutton';
import SVGicon from './SVGicon';
import ButtonText from './ButtonText';

const CircleSVGComponent = styled.path`
  transition: stroke 1.5s, stroke-dashoffset 1.5s, opacity 0.3s;
  stroke-width: 16px;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 314.1593 314.1593;
  stroke-dashoffset: 314.1593;
`;

const LineSVGPath = styled.path`
  transition: stroke 1.5s, stroke-dashoffset 1.5s, opacity 0.3s;
  stroke-width: 20px;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 54 54;
  stroke-dashoffset: 54;
`;

const ButtonSearch = props => {
  const { isMobile } = props;
  return (
    <SVGbutton>
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
  );
};

export default ButtonSearch;
