import React, { Component } from "react";
import classnames from "classnames";
import AuthContext from "../../Provider/AuthContext";
import { Redirect } from "react-router-dom";
import axios from "axios";
import * as Url from "../../Provider/api";

class ForgotPassword extends Component {
  static contextType = AuthContext;

  state = {
    email: "",
    success: "",
    errors: {}
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  forgotPass = async (forgotUer) => {
    try {
      const LinkSend = await axios.post(Url.forgotUrl, forgotUer);
      this.setState({ success: LinkSend.data.success });
    } catch (err) {
      const errors = err.response.data;
      this.setState({ errors: errors });
    }
  };
  onSubmit = async (e) => {
    e.preventDefault();
    const ForgotUserPass = {
      email: this.state.email
    };
    this.forgotPass(ForgotUserPass);
  };

  render() {
    const { errors, success } = this.state;
    console.log(this.context.isAuth);

    const checkSuccess = success
      ? { "is-valid": success }
      : { "is-invalid": errors.email };

    return this.context.isAuth ? (
      <Redirect to="/dashboard" />
    ) : (
      <React.Fragment>
        <div
          className="login mt-5 pt-4 d-flex flex-grow-1 "
          style={{ height: "73vh" }}
        >
          <div className="container align-self-center">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Forgot Password</h5>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className={classnames(
                        "form-control form-control-lg",
                        checkSuccess
                      )}
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    {success ? (
                      <div className="valid-feedback">{success}</div>
                    ) : (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
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

export default ForgotPassword;
