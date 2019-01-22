import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import SVGbutton from './SVGbutton';
import SVGicon from './SVGicon';
import ButtonText from './ButtonText';

const LineSVGPath = styled.path`
  transition: stroke 0.9s, stroke-dashoffset 0.9s, opacity 0.3s;
  stroke-width: 24px;
  fill: none;
  stroke-linecap: square;
  stroke-dasharray: 70 70;
  stroke-dashoffset: 70;
`;

const ButtonShare = props => {
  const { isMobile, history } = props;
  return (
    <SVGbutton
      type="button"
      onClick={() => {
        history.push('/deals');
      }}
    >
      {isMobile ? null : <ButtonText>Share Deal</ButtonText>}
      <SVGicon viewBox="0 0 160 160">
        <LineSVGPath shape-rendering="geometricPrecision" d="M80 80 L80 10" />
        <LineSVGPath shape-rendering="geometricPrecision" d="M80 80 L80 10" />
        <LineSVGPath shape-rendering="geometricPrecision" d="M80 80 L150 80" />
        <LineSVGPath shape-rendering="geometricPrecision" d="M80 80 L150 80" />
        <LineSVGPath shape-rendering="geometricPrecision" d="M80 80 L80 150" />
        <LineSVGPath shape-rendering="geometricPrecision" d="M80 80 L80 150" />
        <LineSVGPath shape-rendering="geometricPrecision" d="M80 80 L10 80" />
        <LineSVGPath shape-rendering="geometricPrecision" d="M80 80 L10 80" />
      </SVGicon>
    </SVGbutton>
  );
};

export default withRouter(ButtonShare);
