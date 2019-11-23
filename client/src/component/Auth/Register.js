import React, { Component } from "react";
// import * as AuthApi from "../Provider/auth";
import classnames from "classnames";
import AuthContext from "../../Provider/AuthContext";
import { Redirect } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import * as Url from "../../Provider/api";
import setAuthToken from "../../Provider/SetAuthToken";

class Register extends Component {
  static contextType = AuthContext;

  _isMounted = false;

  state = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.context.isAuth) {
      this.props.history.push("/dashboard");
    }
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

      const newUser = {
        name: this.state.name,
        email: this.state.email,
        mobile: this.state.mobile,
        password: this.state.password
      };

      const RegisterToken = await axios.post(Url.registerUrl, newUser);
      const RegisterUserToken = RegisterToken.data.token;
      localStorage.setItem("token", RegisterUserToken);
      // deocde the user
      const decode = jwt_decode(RegisterUserToken);

      // Set Auth True
      this.props.history.push("/dashboard");

      this.context.AuthState(decode);
      setAuthToken(RegisterUserToken);
    } catch (error) {
      const errors = error.response.data;
      if (this._isMounted) this.setState({ errors });
    }

    //   const UserRegisterSuccessfull = await this.context.register(newUser);
    //   if (UserRegisterSuccessfull) {
    //     this.props.history.push("/dashboard");
    //   }

    //   const errors = await this.context.errors;
    //   if (this._isMounted) this.setState({ errors })
  };

  render() {
    const { errors } = this.state;

    return this.context.isAuth ? (
      <Redirect to="/dashboard" />
    ) : (
      <div className="register  mt-5 pt-4 flex-grow-1">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your E-Mentor Connector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {<div className="invalid-feedback">{errors.name}</div>}
                </div>
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

                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    maxLength="10"
                    pattern="\d{10}"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.mobile
                    })}
                    placeholder="Enter Your Mobile no."
                    name="mobile"
                    value={this.state.mobile}
                    onChange={this.onChange}
                  />
                  {<div className="invalid-feedback">{errors.mobile}</div>}
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
