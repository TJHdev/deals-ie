import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ userState, component: Component, ...rest }) => {
  console.log('userState: ', userState);

  return (
    <Route
      {...rest}
      component={props =>
        userState.email ? (
          <Fragment>
            <Component {...props} />
          </Fragment>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
