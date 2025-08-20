import PropTypes from 'prop-types';
import React from 'react';
import './header.scss';


const Header = ({ children }) => {
  return (
    <header className="header">
      {children}
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.any,
};

export default Header;
