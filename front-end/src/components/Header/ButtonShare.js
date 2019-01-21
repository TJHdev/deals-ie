import React from 'react';
import styled from 'styled-components';

import SVGbutton from './SVGbutton';
import SVGicon from './SVGicon';
import ButtonText from './ButtonText';

const LineSVGPath = styled.path`
  transition: stroke 1.5s, stroke-dashoffset 1.5s, opacity 0.3s;
  stroke-width: 24px;
  fill: none;
  stroke-linecap: square;
  stroke-dasharray: 160 160;
  stroke-dashoffset: 160;
`;

const ButtonShare = props => {
  const { isMobile } = props;
  return (
    <SVGbutton>
      {isMobile ? null : <ButtonText>Share Deal</ButtonText>}
      <SVGicon viewBox="0 0 160 160">
        <LineSVGPath shape-rendering="geometricPrecision" d="M80 80 L80 0" />
        <LineSVGPath shape-rendering="geometricPrecision" d="M80 80 L80 0" />
        <LineSVGPath shape-rendering="geometricPrecision" d="M80 80 L160 80" />
        <LineSVGPath shape-rendering="geometricPrecision" d="M80 80 L160 80" />
        <LineSVGPath shape-rendering="geometricPrecision" d="M80 80 L80 160" />
        <LineSVGPath shape-rendering="geometricPrecision" d="M80 80 L80 160" />
        <LineSVGPath shape-rendering="geometricPrecision" d="M80 80 L0 80" />
        <LineSVGPath shape-rendering="geometricPrecision" d="M80 80 L0 80" />
      </SVGicon>
    </SVGbutton>
  );
};

export default ButtonShare;
