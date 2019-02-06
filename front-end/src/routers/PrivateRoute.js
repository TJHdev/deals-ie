import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
import { Route, Redirect } from '@reach/router';

export default ({ userState, component: Component, ...rest }) =>
  // console.log('userState: ', userState);
  // console.log('Component: ', Component);
  // console.log('rest: ', rest);

  userState.email ? <Component /> : <Redirect to="/" />;
