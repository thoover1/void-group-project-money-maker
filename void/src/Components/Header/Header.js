import React from "react";
import logo from "../../void_logo.png";
import { NavLink } from 'react-router-dom';
import './Header.scss';

export default function Header(props) {
  return (
    <div className='header-main' >
      <div className='header-contents'>
        <NavLink to='/'>
          <img className='logo' src={logo} alt="logo" />
        </NavLink>
        <span className='navbar'>
          <NavLink className='nav' activeClassName='active' to='/dashboard' >Dashboard</NavLink>
          <NavLink className='nav' activeClassName='active' to='/login-register' >{props.title}</NavLink>
        </span>
      </div>
    </div>
  );
}
