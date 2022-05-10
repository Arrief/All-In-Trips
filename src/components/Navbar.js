import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState (false);
  const [button, setButton] = useState(true);

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

  return (
    <nav className='navbar'>
      <Link to="/">
      <img className='logo' src="./favicon2.png" alt="logo image"/>
      </Link>
      <div className="navbar-container">

        <Link to ="/" className="navbar-logo">
          All In Trips
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'} >
          <li className='nav-item'>
            <Link to ='/weather' className='nav-links' onClick={closeMobileMenu}>
              Weather  
            </Link>
          </li>
          <li className='nav-item'>
            <Link to ='/flights' className='nav-links' onClick={closeMobileMenu}>
             Flights
            </Link>
          </li>
          <li className='nav-item'>
            <Link to ='/hotels' className='nav-links' onClick={closeMobileMenu}>
             Hotels
            </Link>
          </li>
          <li className='nav-item'>
            <Link to ='/about-us' className='nav-links' onClick={closeMobileMenu}>
              About  
            </Link>
          </li>
        </ul>  
      </div>
    </nav>
  )
}

export default Navbar;
