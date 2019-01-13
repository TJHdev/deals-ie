import styled from 'styled-components';

export default styled.div`
  font-weight: 600;
  margin: 0 auto;
  padding: 0 2rem 0 1rem; /* m-size */
  max-width: 124rem;
`;

export const ContentContainerForm = styled.div`
  font-weight: 600;
  margin: 0 auto;
  padding: 0 2rem; /* m-size */
  max-width: 70rem;
`;

export const ContentContainerPasswordForm = styled(ContentContainerForm)`
  max-width: 34rem;
`;

export const ContentContainerHalf = styled.div`
  /* margin-right:  */
  display: inline-block;
  max-width: 50%;
`;
