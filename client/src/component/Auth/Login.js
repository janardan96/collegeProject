import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../Provider/route";
import classnames from "classnames";
import AuthContext from "../../Provider/AuthContext";
import { Redirect } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import * as Url from "../../Provider/api";
import setAuthToken from "../../Provider/SetAuthToken";
import Navbar from "../Layout/Navbar";


class Login extends Component {
  _isMounted = false;

  static contextType = AuthContext;

  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    try {
      e.preventDefault();
      const UserLogin = {
        email: this.state.email,
        password: this.state.password
      };
      const LoginToken = await axios.post(Url.loginUrl, UserLogin);
      const LoginUserToken = LoginToken.data.token;
      localStorage.setItem("token", LoginUserToken);

      // deocde the user
      const decode = jwt_decode(LoginUserToken);

      // Set Auth True
      this.context.AuthState(decode);
      setAuthToken(LoginUserToken);
      this.props.history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data;
      if (this._isMounted) this.setState({ errors });
    }

    // Sending data to Global state;
    // const UserLoginSuccessfull = await this.context.login(UserLogin);
    // if (UserLoginSuccessfull) {
    //   this.props.history.push("/dashboard");
    // }

    // // Handling Errors
    // const errors = await this.context.errors;
    // if (this._isMounted) this.setState({ errors });
  };

  render() {
    const { errors } = this.state;
    return this.context.isAuth ? (
      <Redirect to="/dashboard" />
    ) : (
        <React.Fragment>
          <Navbar />
          <div
            className="login  mt-5 pt-4 d-flex flex-grow-1 "
            style={{ height: "73vh" }}
          >
            <div className="container align-self-center">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">
                    Sign in to your E-Mentor Connector account
                </p>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input
                        type="email"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.email
                        })}
                        placeholder="Email Address"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                      {<div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.password
                        })}
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                      {<div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <input
                      type="submit"
                      className="btn btn-info btn-block mt-4"
                    />
                  </form>
                  <Link to={ROUTES.Forgot}>Forgot password</Link>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
  }
}

export default Login;
