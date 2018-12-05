import styled from 'styled-components';

export const SocialMediaImg = styled.img`
  margin-right: 0.5rem;
  height: var(--ml-size);
`;

export const SocialMediaAnchorTag = styled.a`
  display: inline-block;
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const FacebookPostButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  background-color: var(--blue);
  color: white;
  font-size: var(--font-size-large);
  font-weight: 300;
  border: none;
  border-radius: 5px;
  padding: var(--xs-size);
  margin: var(--xs-size) 0;
  margin-right: 1rem;

  text-decoration: none;
  /* line-height: 1; // dictates the height of a button */
  transition: all 0.2s;

  &:hover {
    /* background-color: lighten(var(--blue), 10%); */
    /* filter: brightness(50%); */
    transform: translateY(-2px);
    background-color: var(--blue-lightened);
    box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.7);
  }

  &:active {
    box-shadow: none;
    transform: translateY(2px);
  }
`;

export const TwitterPostButton = styled(FacebookPostButton)`
  background-color: var(--twitter-blue);

  &:hover {
    /* background-color: lighten(var(--blue), 10%); */
    /* filter: brightness(50%); */

    background-color: var(--twitter-blue-hover);
  }
`;
