import { Field, ErrorMessage } from 'formik';

import styled from 'styled-components';

export const StyledField = styled(Field)`
  display: block;
`;

export const StyledErrorMessage = styled(ErrorMessage)`
  white-space: pre-line;
  color: red;
`;
