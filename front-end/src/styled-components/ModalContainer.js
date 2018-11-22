import styled from 'styled-components';

export default styled.div`
  background-color: white;
  color: black;
  width: 33rem;
  outline: none;
  border-radius: 10px;
  padding: var(--l-size);
  text-align: left;
  box-shadow: 0px 2px 8px #000;

  &:focus {
    outline: none;
  }
`;
