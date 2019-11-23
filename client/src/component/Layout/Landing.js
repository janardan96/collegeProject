import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../Provider/route";
// import AuthContext from "../Provider/AuthContext";
import AuthContext from "../../Provider/AuthContext";

class LandingPage extends Component {
  static contextType = AuthContext;

  state = {};
  render() {
    return !this.context.isAuth ? (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">E-Mentoring Connector</h1>
                <p className="lead">
                  Create a student profile/portfolio, share posts and get help
                  from other students and mentors
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      (window.location.href = "/dashboard")
    );
  }
}

export default LandingPage;
