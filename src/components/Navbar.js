import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
//import 'antd/dist/antd.css';
//import {Menu, Dropdown} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Dropdown from './Dropdown';
//import {Navbar, NavDropdown} from 'react-bootstrap'

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            HealthBank
          </Link>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/services'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>

            <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <Link
                to='/'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Sign up <i className='fas fa-caret-down' />
              </Link>
              {dropdown && <Dropdown />}
            </li>
          </ul>
        </div>
      </nav>

    </>
  );
}

export default Navbar;
