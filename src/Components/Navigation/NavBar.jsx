import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import "../../CSS/Reset.css";
import { useAuthContext } from "../../Context/AuthContext";

const NavBar = () => {
  const { token, userLogout } = useAuthContext();

  return (
    <>
      <header className="nav-bar">
        <div className="nav-bar_row">
          <div className="nav-bar_section--align-start">
            <button className="nav-bar_action-item">
              <i className="fas fa-bars"></i>
            </button>
            <span className="nav-bar_heading heading heading-font">
              Pallet{" "}
            </span>
            <span className="sub-heading heading-font"> Play</span>
          </div>

          <div className="search">
            <input
              type="text"
              placeholder="Search.."
              name="search"
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>

          <div className="nav-bar_section--align-end">
            <button className="login-btn btn">
              
              {token === null ? (
                <Link to="/login" className="link">
                  Login
                </Link>
               ): (
                <Link to="/logout" className="link" onClick={userLogout()}>
                  Logout
                </Link> 
              )} 
            </button>
            <button className="nav-bar_action-item">
              {token && (
                <img
                  src="https://images.unsplash.com/photo-1543132220-3ec99c6094dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fHByb2ZpbGV8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  className="round-avatar-image avatar-sm"
                />
               )} 
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export { NavBar };
