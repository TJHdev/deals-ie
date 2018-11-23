import { Field, ErrorMessage } from 'formik';

import styled from 'styled-components';

export const TextField = styled(Field)`
  font-weight: inherit;
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin: 0.6rem 0;
  border-radius: 5px;

  &::placeholder {
    color: rgb(200, 200, 200);
  }
`;

export const NumericField = styled(Field)`
  font-weight: inherit;
  display: block;
  width: 165px;
  padding: 0.5rem;
  margin: 0.6rem 0;
  border-radius: 5px;

  &::placeholder {
    color: rgb(200, 200, 200);
  }
`;

export const TextareaField = styled(Field)`
  font-weight: inherit;
  display: block;
  width: 100%;
  height: 200px;
  padding: 0.5rem;
  margin: 0.6rem 0;
  border-radius: 5px;

  &::placeholder {
    color: rgb(200, 200, 200);
  }
`;

export const CheckboxField = styled(Field)`
  padding: 0.5rem;
  margin: 0.6rem 0;
  margin-right: 1rem;
  border-radius: 5px;
`;

export const StyledErrorMessage = styled(ErrorMessage)`
  white-space: pre-line;
  color: var(--red);
  padding: 0.5rem;
  font-size: 1.3rem;
`;

export const ErrorSpan = styled.span`
  margin-left: 2rem;
  color: var(--red);
`;
