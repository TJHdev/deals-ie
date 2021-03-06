import styled from 'styled-components';

const SVGbutton = styled.button`
  display: flex;
  align-items: center;
  z-index: 1;

  background-color: var(--red);
  color: white;
  font-size: var(--font-size-large);
  font-weight: 300;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 0.7rem;
  margin-left: var(--xs-size);

  @media (max-width: 500px) {
    margin-left: 0;
  }

  text-decoration: none;
  line-height: 0; // dictates the height of a button
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s, opacity 0.5s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.7);
  }

  &:focus {
    background-color: white;

    & p {
      color: var(--red);
    }
  }

  &:active {
    box-shadow: none;
    transform: translateY(2px);
  }

  &:focus path:nth-child(even) {
    stroke-dashoffset: 0;
    opacity: 1;
  }

  &:focus path:nth-child(odd) {
    /* fill: white; */
    opacity: 0;
  }
`;

export default SVGbutton;
