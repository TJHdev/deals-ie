import styled from 'styled-components';

export default styled.button`
  background-color: var(--blue);
  color: white;
  font-size: var(--font-size-large);
  font-weight: 300;
  border: none;
  padding: var(--s-size);
  margin: var(--xs-size);

  display: inline-block;
  text-decoration: none;
  line-height: 1; // dictates the height of a button
  transition: all 0.2s;

  &:hover {
    /* background-color: lighten(var(--blue), 10%); */
    filter: brightness(120%);
  }
`;
