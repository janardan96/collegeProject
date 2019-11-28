import axios from "axios";
import * as Url from "./api";
import React, { Component } from "react";
import AuthContext from "./AuthContext";
import jwt_decode from "jwt-decode";
import setAuthToken from "./SetAuthToken";

export class AuthStore extends Component {
  state = {
    isAuth: false,
    user: {}
  };

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const decode = jwt_decode(localStorage.token);
      this.setState({ isAuth: true });
      this.setState({ user: decode });
      setAuthToken(token);
      window.location.ref = "/dashboard";
      const currentTime = Date.now() / 1000;
      if (decode.exp < currentTime) {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        window.location.href = "/login";
      }
    }
  }


  AuthState = (userDecode) => {
    this.setState({ isAuth: true, user: userDecode });
  };

  async deleteAccount() {
    try {
      if (window.confirm("Are you sure? This can not be undo")) {
        await axios.delete(Url.deleteProfile);
        this.setState({ isAuth: false, user: {} });
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        // window.location.href = "/login";
      }
    } catch (error) {
      this.setState({ errors: error.response.data });
    }
  }

  logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    console.log("Pressesd");

    // Removing auth header
    setAuthToken(false);
    this.setState({ isAuth: false });
    this.setState({ user: {} });
    window.location.href = "/login";
  }

  render() {
    const { children } = this.props;
    const logout = this.logout;
    const deleteAccount = this.deleteAccount;
    const AuthState = this.AuthState;

    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          logout,
          deleteAccount,
          AuthState
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}
