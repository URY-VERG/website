import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span role="img" aria-label="tractor"></span> ANNADATA 🌱🌾

      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/weather">Weather</Link></li>
      <li><Link to="/products">Products</Link></li> 
        <li><Link to="/market">Market</Link></li>
        <li><Link to="/qr-scan">QR Scan</Link></li>
<li><Link to="/qr-gen">QR Generator</Link></li>

        <li><Link to="/learning">Learning</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/developer">Developer</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
