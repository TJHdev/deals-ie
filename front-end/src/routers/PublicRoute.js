import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props => (isAuthenticated ? <Redirect to="/dashboard" /> : <Component {...props} />)}
  />
);

// const mapStateToProps = state => ({
//   isAuthenticated: Boolean(state.auth.uid)
// });

// export default connect(mapStateToProps)(PublicRoute);
