import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false); // State to track if menu is active
  const navigate = useNavigate();

  // Check if the user is logged in by checking for the token
  const isLoggedIn = !!localStorage.getItem('token');
  
  // Check if the logged-in user is an admin (based on token stored in localStorage)
  const isAdmin = localStorage.getItem('token') === 'fake-jwt-token';

  const handleMenuToggle = () => {
    setMenuActive(!menuActive); // Toggle the menu visibility
  };

  const closeMenu = () => {
    setMenuActive(false); // Close menu when a link is clicked
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          <img src='./logo/logo3.jpg'/>
        </Link>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="menu-icon" onClick={handleMenuToggle}>
        &#9776; {/* This is the hamburger icon */}
      </div>

      <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
        {/* Common Links */}
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        
        {/* Conditional Links based on login status */}
        {isAdmin ? (
          <>
            <li><Link to="/admin" onClick={closeMenu}>Admin</Link></li>
            <li><Link to="/adminEvent" onClick={closeMenu}>Event</Link></li>
            <li><Link to="/adminTeammate" onClick={closeMenu}>Teammates</Link></li>
            <li><Link to="/adminFooter" onClick={closeMenu}>Footer</Link></li>
            <li><Link to="/adminNews" onClick={closeMenu}>News</Link></li>
            <li><Link to="/gallery" onClick={closeMenu}>Gallery</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/event" onClick={closeMenu}>Events</Link></li>
            <li><Link to="/team" onClick={closeMenu}>Teams</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          </>
        )}
        
        {/* Login/Logout link */}
        {!isLoggedIn ? (
          <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
        ) : (
          <li><button onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
