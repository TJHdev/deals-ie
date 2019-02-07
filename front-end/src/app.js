import 'react-dates/initialize';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import { Router } from '@reach/router';
// import AppRouter from './routers/AppRouter';
import AppRouterNew from './routers/AppRouterNew';
import 'normalize.css/normalize.css';
import './styles/styles.css';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';

if (!window.env) {
  // environment variable dependant
  window.env = {
    mode: 'development'
  };
}

window.BACKEND_PATH =
  window.env.mode === 'production' ? 'https://www.eiredeals.com/api' : 'http://localhost:5000';

const jsx = (
  <Fragment>
    <AppRouterNew />
  </Fragment>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

renderApp();

// <AppRouter />
