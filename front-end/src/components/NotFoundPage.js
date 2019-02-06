import React from 'react';
// import { Link } from 'react-router-dom';
import { Link } from '@reach/router';

const NotFoundPage = () => (
  <div>
    {'404! -'}
    <Link to="/">Go home</Link>
  </div>
);

export default NotFoundPage;
