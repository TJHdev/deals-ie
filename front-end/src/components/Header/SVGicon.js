import styled from 'styled-components';

const SVGicon = styled.svg`
  height: 22px;

  path:nth-child(even) {
    stroke: var(--red);
    opacity: 0;
  }

  path:nth-child(odd) {
    stroke: white;
    stroke-dashoffset: 0;
  }
`;
export default SVGicon;
