import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import Guest from "./Guest";
import User from "./User";

export default function Navbar(props) {
  const navigate = useNavigate();
  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-lg-0 text-white text-decoration-none"
          >
            <img src={logo} style={{ height: "40px" }} />
          </a>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-md-0 justify-content-center"></ul>
          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >

          </form>
          {props.loggedIn ? <User user={props.user} logout={props.logout} /> : <Guest />}
        </div>
      </div>
    </header>
  );
}
