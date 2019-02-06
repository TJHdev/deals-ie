import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
import { Route, Redirect } from '@reach/router';

export default ({ userState, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (userState.email ? <Redirect to="/" /> : <Component {...props} />)}
  />
);
