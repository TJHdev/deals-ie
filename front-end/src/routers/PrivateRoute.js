import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ userState, component: Component, ...rest }) => {
  console.log('userState: ', userState);

  return (
    <Route
      {...rest}
      component={props =>
        userState.email ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
