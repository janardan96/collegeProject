import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../Provider/route";
import AuthContext from "../../Provider/AuthContext";

const LogInSignUp = () => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="nav-link" to={ROUTES.Register}>
        Sign Up
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to={ROUTES.Login}>
        Login
      </Link>
    </li>
  </ul>
);

const LogOutDiv = (props) => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="nav-link" to="/">Dashboard</Link>
    </li>

    <li>
      <a href="/" className="nav-link" onClick={(e) => props.logout(e)}>
        <img
          className="rounded-circle"
          src={props.user.profilePic}
          alt={props.user.name.charAt(0).toUpperCase() + props.user.name.slice(1)}
          style={{ width: "25px", marginRight: "5px" }}
        />
        Logout
      </a>
    </li>
  </ul>
);

const Navbar = (props) => (
  <AuthContext.Consumer>
    {({ isAuth, logout, user }) => (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            E- Mentoring Connector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to={ROUTES.MentorsProfile}>
                  Mentors
                </Link>
              </li>
            </ul>

            <div>
              {!isAuth ? (
                <LogInSignUp />
              ) : (
                  <LogOutDiv logout={logout} user={user} />
                )}
            </div>
          </div>
        </div>
      </nav>
    )}
  </AuthContext.Consumer>
);

export default Navbar;
