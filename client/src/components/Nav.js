import React from 'react';
import logo from '../assets/2-green.png'
import { Link } from 'react-router-dom';


const Nav = () => {
  return (
    <div>
      <a href='/'> <img className='logo' src={logo}></img> </a>
      <nav className='nav'>
        <li> Home </li>
        <li> Items </li>
        <li> About </li>
      </nav>
    </div>
  )
}

export default Nav
