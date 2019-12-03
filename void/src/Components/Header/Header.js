import React from "react";
import logo from "../../void_logo.png";
import {NavLink} from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <span>
        <NavLink to='/' >Home</NavLink>
        <NavLink to='/login-register' >Login</NavLink>
        <NavLink to='/dashboard' >Dashboard</NavLink>
        <NavLink to='/profile' >Profile</NavLink>
      </span>
    </div>
  );
}
