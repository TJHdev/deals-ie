import styled from 'styled-components';
import { Field, ErrorMessage } from 'formik';

export const RadioContainer = styled.div`
  display: block;
`;

export const RadioGroup = styled.div`
  display: inline-block;
  width: 70px;
`;

export const RadioInput = styled(Field)`
  display: none;

  &:checked ~ label span::after {
    opacity: 1;
  }
`;

export const RadioLabel = styled.label`
  cursor: pointer; // gives the different pointer when hovering
  position: relative;
  padding-left: 3rem;
  margin-bottom: 3rem;
`;

export const RadioButton = styled.span`
  height: 2.2rem;
  width: 2.2rem;
  border: 4px solid var(--blue);
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  left: 0;
  top: -0.4rem;

  &::after {
    content: '';
    display: block;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--blue);
    opacity: 0;
    transition: opacity 0.2s;
  }
`;
