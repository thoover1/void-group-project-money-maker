import React, { Component } from "react";
import { FaBars } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import "./Sidebar.scss";

export default class Sidebar extends Component {
  render() {
    return (
      <div>
        <div className="sidebar-background">
          <div className="inner">
            <span>
              <FaBars className="ham-menu" />
            </span>
            <span className="user-around">
              <div className="user-avi"></div>
              <div className="user-avi"></div>
              <div className="user-avi"></div>
              <div className="user-avi"></div>
              <div className="user-avi"></div>
              <div className="user-avi"></div>
              <div className="user-avi"></div>
              <div className="user-avi"></div>
              <div className="user-avi"></div>
              <div className="user-avi"></div>
            </span>
            <span>
              <MdMoreHoriz className="three-dots" />
            </span>
          </div>
        </div>
      </div>
    );
  }
}
