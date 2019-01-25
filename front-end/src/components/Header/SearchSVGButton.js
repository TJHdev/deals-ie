import styled from 'styled-components';

const SearchSVGbutton = styled.button`
  display: flex;
  align-items: center;
  z-index: 1;

  background-color: var(--red);
  color: white;
  height: 4rem;
  /* font-size: 2.2rem; */
  font-weight: 300;
  outline: none;
  border: 2px solid var(--red-dark);
  border-radius: 0 10px 10px 0;
  padding: 0.7rem;

  @media (max-width: 500px) {
    margin-left: 0;
  }

  text-decoration: none;
  line-height: 0; // dictates the height of a button
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s, opacity 0.5s;

  &:hover,
  &:focus {
    background-color: white;

    & p {
      color: var(--red);
    }
  }

  &:active {
  }

  &:hover path:nth-child(even),
  &:focus path:nth-child(even) {
    stroke-dashoffset: 0;
    opacity: 1;
  }

  &:hover path:nth-child(odd),
  &:focus path:nth-child(odd) {
    /* fill: white; */
    opacity: 0;
  }
`;

export default SearchSVGbutton;
