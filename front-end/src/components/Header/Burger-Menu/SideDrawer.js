import React from 'react';
import PropTypes from 'prop-types';

import './SideDrawer.css';

const SideDrawer = props => {
  const { show } = props;

  let drawerClasses = 'side-drawer';
  if (show) {
    drawerClasses = 'side-drawer open';
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <a href="/">Products</a>
        </li>
        <li>
          <a href="/">Users</a>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;

SideDrawer.propTypes = {
  show: PropTypes.bool.isRequired
};
