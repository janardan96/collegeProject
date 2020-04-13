import React, { Component } from "react";
import classnames from "classnames";
import AuthContext from "../../Provider/AuthContext";
import { Redirect } from "react-router-dom";
import * as Url from "../../Provider/api";
import axios from "axios";
import Navbar from "../Layout/Navbar";

class ResetPassword extends Component {
  static contextType = AuthContext;

  state = {
    password: "",
    userId: "",
    passwordToken: "",
    success: "",
    errors: {}
  };

  componentDidMount() {
    axios
      .get(Url.resetPass + `/${this.props.match.params.token}`)
      .then((res) =>
        this.setState({
          userId: res.data.user,
          passwordToken: res.data.passwordToken
        })
      )
      .catch((err) => this.setState({ errors: err.response.data }));
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  ResetPass = async (resetPass) => {
    try {
      const resetPassword = await axios.post(
        `/api/users/reset/${this.props.match.params.token}`,
        resetPass
      );
      const ResetUserSuccess = resetPassword.data.success;
      // Set Auth True
      this.setState({ success: ResetUserSuccess });
      this.props.history.push("/login");
    } catch (err) {
      const errors = err.response.data;
      this.setState({ errors: errors });
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const ResetUserPass = {
      password: this.state.password,
      userId: this.state.userId,
      passwordToken: this.state.passwordToken
    };
    this.ResetPass(ResetUserPass);
  };

  render() {
    const { errors } = this.state;
    console.log(this.context.isAuth);
    console.log(this.state);

    return this.context.isAuth ? (
      <Redirect to="/dashboard" />
    ) : (
        <React.Fragment>
          <Navbar />
          <div
            className="login mt-5 pt-4 d-flex flex-grow-1 "
            style={{ height: "73vh" }}
          >
            <div className="container align-self-center">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h5 className="display-4 text-center">Reset Password</h5>
                  <form onSubmit={this.onSubmit}>
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
                      <input
                        type="hidden"
                        name="userId"
                        value={this.state.userId}
                      />
                      <input
                        type="hidden"
                        name="passwordToken"
                        value={this.state.passwordToken}
                      />
                      {<div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <input
                      type="submit"
                      className="btn btn-info btn-block mt-4"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
  }
}

export default ResetPassword;
