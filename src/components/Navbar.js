import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cart = [] }) {  // default value added to avoid errors
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        ANNADATA 🌱🌾
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shopping">Shopping</Link></li>
        <li><Link to="/weather">Weather</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/market">Market</Link></li>
        <li><Link to="/finance">Finance</Link></li>
        <li><Link to="/learning">Learning</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/developer">Developer</Link></li>

        {/* CART BUTTON */}
        <li>
          <Link className="cart-link" to="/checkout">
            Cart ({cart.length})
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
