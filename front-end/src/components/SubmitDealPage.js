import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ContentContainer from '../styled-components/ContentContainer';

export default () => (
  <ContentContainer>
    <div>Testing</div>
    <div>TestingTwo</div>
    <div>TestingThree</div>
  </ContentContainer>
);

// <NavLink to="/create" activeClassName="is-active">Create expense</NavLink>
// <NavLink to="/help" activeClassName="is-active">Help</NavLink>
