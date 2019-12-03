import React from "react";
import logo from "../../void_logo.png";
import {NavLink} from 'react-router-dom';
import './Header.scss';

export default function Header() {
  return (
    <div className='header-main' >
      <img className='logo' src={logo} alt="logo" />
      <span className='navbar'>
        <NavLink className='nav' activeClassName='active' to='/' >Home</NavLink>
        <NavLink className='nav' activeClassName='active' to='/login-register' >Login</NavLink>
        <NavLink className='nav' activeClassName='active' to='/dashboard' >Dashboard</NavLink>
        <NavLink className='nav' activeClassName='active' to='/profile' >Profile</NavLink>
      </span>
    </div>
  );
}
