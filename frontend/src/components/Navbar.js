import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Car Rental</Link>
      <Link to="/browse">Browse Cars</Link>
      <Link to="/help">Help</Link>
    </nav>
  );
}

export default Navbar;
