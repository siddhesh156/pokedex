import React from 'react';
import './header.scss';

interface HeaderProps {
    children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="header">
      {children}
    </header>
  );
};

export default Header;
