import 'react-dates/initialize';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.css';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';

// console.log('DEPLOYED_ENV:', process.env.DEPLOYED_ENV);
// console.log('mode:', process.env.mode);
// console.log('NGINX_PRODUCTION:', process.env.NGINX_PRODUCTION);
// console.log('new mode:', window.env.mode);

if (!window.env) {
  window.env = {
    mode: 'development'
  };
}

window.BACKEND_PATH =
  window.env.mode === 'production' ? 'https://www.eiredeals.com/api' : 'http://localhost:5000';

const jsx = (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
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
