import styled from 'styled-components';

// *****************
// loading component
// *****************

export const LoadingContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -20;
`;

export const LoadingImage = styled.img`
  width: 100px;
  height: auto;
  /* z-index: -20; */
`;
