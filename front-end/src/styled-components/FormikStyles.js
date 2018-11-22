import { Field, ErrorMessage } from 'formik';

import styled from 'styled-components';

export const StyledField = styled(Field)`
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin: 0.6rem 0;
  border-radius: 5px;
`;

export const StyledErrorMessage = styled(ErrorMessage)`
  white-space: pre-line;
  color: blue;
  padding: 0.5rem;
  font-size: 1.3rem;
`;
