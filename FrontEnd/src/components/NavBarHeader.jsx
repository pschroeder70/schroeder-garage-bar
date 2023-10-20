import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='navbar'>
      <div className='logo'>Schroeder Garage Bar</div>
      <ul className={`navbar-menu ${isOpen ? "open" : ""}`}>
        <li className='navbar-menu__item'>
          <Link to='/' onClick={toggleNavbar}>
            Home
          </Link>
        </li>
        <li className='navbar-menu__item'>
          <Link to='/AddRecipe' onClick={toggleNavbar}>
            Add Recipe
          </Link>
        </li>
        <li className='navbar-menu__item'>
          <Link to='/AddSupply' onClick={toggleNavbar}>
            Add Supply
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
