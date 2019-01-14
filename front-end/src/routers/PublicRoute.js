import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ userState, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (userState.email ? <Redirect to="/" /> : <Component {...props} />)}
  />
);
