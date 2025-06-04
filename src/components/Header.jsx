import React from 'react';
import brandLogo from '../../public/images/brand-logo.png'; // Adjust path if necessary

function Header() {
  return (
    <header>
      <img src={brandLogo} alt="Brand Logo" />
    </header>
  );
}

export default Header;