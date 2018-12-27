import 'react-dates/initialize';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.css';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';

window.BACKEND_PATH =
  process.env.DEPLOYED_ENV === 'production'
    ? 'http://www.eiredeals.com:5000'
    : 'http://www.eiredeals.com:5000';
// process.env.DEPLOYED_ENV === 'production' ? 'http://www.eiredeals.com:5000' : 'http://localhost:5000';

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
