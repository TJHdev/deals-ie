import styled from 'styled-components';

export const Button = styled.button`
  background-color: var(--blue);
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
    /* background-color: lighten(var(--blue), 10%); */
    /* filter: brightness(50%); */
    transform: translateY(-2px);
    /* background-color: var(--blue-lightened); */
    box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.7);
  }

  &:active {
    box-shadow: none;
    transform: translateY(2px);
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
    /* background-color: lighten(var(--blue), 10%); */
    /* filter: brightness(120%); */
    color: black;
  }
`;

export const SmallBackgroundButton = styled(BackgroundButton)`
  font-size: var(--font-size-small);
`;
