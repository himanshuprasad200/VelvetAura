import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import logo from "../../../images/logo.PNG";
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsNavbarFixed(true);
    } else {
      setIsNavbarFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isNavbarFixed ? 'fixed' : ''}`}>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/products" onClick={toggleMenu}>Products</Link></li>
        <li><Link to="/contact" onClick={toggleMenu}>Contact Us</Link></li>
        <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
      </ul>
      <div className="icons">
        <Link to="/search"><AiOutlineSearch /></Link>
        <Link to="/login"><AiOutlineUser /></Link>
        <Link to="/cart"><AiOutlineShoppingCart /></Link>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`line ${isMenuOpen ? 'active' : ''}`}></div>
          <div className={`line ${isMenuOpen ? 'active' : ''}`}></div>
          <div className={`line ${isMenuOpen ? 'active' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
