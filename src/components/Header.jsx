import React from 'react';
import Logo from '../Logo.svg';
import '../Styles/Header.css'


function Header() {
  return (
    <div className="header">
        <div className="logo">
          <img src={Logo} alt="kayak svg" />
        </div>
      </div>
  )
}

export default Header 