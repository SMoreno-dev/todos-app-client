import React from "react";

import logo from "./logo.png";
import "./NavBar.css";

import { useNavigate } from "react-router";

const NavBar = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (!localStorage.id) {
      return navigate("/login");
    } else {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      return navigate("/login");
    }
  };

  return (
    <div className="nv-container">
      <div className="logo-and-todos">
        <img
          src={logo}
          className="todos-logo"
          onClick={() => navigate("/")}
          alt="logo"
        ></img>
      </div>

      <div className="nav-end">
        <div className="navbar-button" onClick={() => handleSignIn()}>
          {!localStorage.id ? "Log In" : "Log Out"}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
