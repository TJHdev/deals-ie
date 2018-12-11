import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = styled.button`
  background-color: var(--green);
  color: white;
  font-size: var(--font-size-large);
  font-weight: 300;
  border: none;
  border-radius: 5px;
  padding: var(--s-size);
  margin: var(--xs-size) 0;

  display: inline-block;
  text-decoration: none;
  line-height: 1; // dictates the height of a button
  transition: all 0.2s;

  &:hover {
    /* background-color: lighten(var(--green), 10%); */
    /* filter: brightness(50%); */
    transform: translateY(-2px);
    /* background-color: var(--green-lightened); */
    box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.7);
  }

  &:active {
    box-shadow: none;
    transform: translateY(2px);
  }

  &:disabled {
    background-color: var(--grey);
    color: white;
    transform: none;
    box-shadow: none;
  }
`;

export const SmallButton = styled(Button)`
  font-size: var(--font-size-medium);
`;

export const LargeButton = styled(Button)`
  font-size: var(--font-size-large);
`;

export const BackgroundButton = styled.button`
  background-color: white;
  color: grey;
  font-size: var(--font-size-large);
  font-weight: 300;
  border: none;
  border-radius: 5px;
  padding: var(--s-size);
  margin: var(--xs-size) 0;

  display: inline-block;
  text-decoration: none;
  line-height: 1; // dictates the height of a button
  transition: all 0.2s;

  &:hover {
    /* background-color: lighten(var(--green), 10%); */
    /* filter: brightness(120%); */
    color: black;
  }

  &:hover span {
    color: black;
  }

  &:disabled {
    background-color: black;
    color: white;
  }
`;

export const SignUpHighlightSpan = styled.span`
  color: var(--green);
  /* color: green; */
  font-weight: 600;
  transition: all 0.2s;
`;

export const SmallBackgroundButton = styled(BackgroundButton)`
  padding: 0.75rem;
  display: block;
  border: 1px solid grey;
  font-size: var(--font-size-small);
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;
