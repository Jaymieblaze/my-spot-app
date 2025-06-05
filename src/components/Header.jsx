import React from 'react';
import brandLogo from '/src/assets/brand-logo.png';

function Header() {
  return (
    <header>
      <img src={brandLogo} alt="Brand Logo" />
    </header>
  );
}

export default Header;