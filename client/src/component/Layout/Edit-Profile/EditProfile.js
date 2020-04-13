import React, { Component } from "react";
// import AuthContext from "../../Provider/AuthContext";
import classnames from "classnames";
import * as Url from "../../../Provider/api";
import axios from "axios";
import _ from "lodash";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

class EditProfile extends Component {
    state = {
        displaySocilaInput: false,
        handle: "",
        company: "",
        portfolio: "",
        location: "",
        status: "",
        skills: "",
        githubusername: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: "",
        errors: {}
    };

    componentDidMount() {
        // Getting user profile data
        axios
            .get(Url.getProfile, {
                headers: { Authorization: `${localStorage.getItem("token")}` }
            })
            .then((res) => {
                this.setState({
                    handle: res.data.handle,
                    company: !_.isEmpty(res.data.company) ? res.data.company : "",
                    portfolio: !_.isEmpty(res.data.portfolio) ? res.data.portfolio : "",
                    location: !_.isEmpty(res.data.location) ? res.data.location : "",
                    status: !_.isEmpty(res.data.status) ? res.data.status : "",
                    skills: res.data.skills.join(","),
                    githubusername: !_.isEmpty(res.data.githubusername)
                        ? res.data.githubusername
                        : "",
                    bio: !_.isEmpty(res.data.bio) ? res.data.bio : "",
                    twitter: !_.isEmpty(res.data.twitter) ? res.data.twitter : "",
                    facebook: !_.isEmpty(res.data.facebook) ? res.data.facebook : "",
                    linkedin: !_.isEmpty(res.data.linkedin) ? res.data.linkedin : "",
                    youtube: !_.isEmpty(res.data.youtube) ? res.data.youtube : "",
                    instagram: !_.isEmpty(res.data.instagram) ? res.data.instagram : ""
                });
            })
            .catch((err) => this.setState({ errors: err.response.data }));
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    editProfile = async (createUser) => {
        try {
            await axios.post(Url.createProfile, createUser);
            this.props.history.push("/dashboard");
        } catch (err) {
            const errors = err.response.data;
            this.setState({ errors: errors });
        }
    };
    onSubmit = async (e) => {
        e.preventDefault();
        const CreateUserProfile = {
            handle: this.state.handle,
            company: this.state.company,
            portfolio: this.state.portfolio,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        };
        this.editProfile(CreateUserProfile);
    };

    render() {
        const { errors } = this.state;

        return (
            <React.Fragment>
                <Navbar />
                <div className="create-profile" style={{ marginTop: "90px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <Link to="/dashboard" className="btn btn-light">
                                    Go Back
              </Link>
                                <h1 className="display-4 text-center">Edit Profile</h1>
                                <small className="d-block pb-3">* = required field</small>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.handle
                                            })}
                                            placeholder="* Profile handle"
                                            disabled
                                            name="handle"
                                            value={this.state.handle}
                                            onChange={this.onChange}
                                        />
                                        {<div className="invalid-feedback">{errors.handle}</div>}

                                        <small className="form-text text-muted">
                                            Unique handle name can't be changed
                  </small>
                                    </div>
                                    <div className="form-group">
                                        <select
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.status
                                            })}
                                            name="status"
                                            value={this.state.status}
                                            onChange={this.onChange}
                                        >
                                            <option value="0">* Select Professional Status</option>
                                            <option value="Developer">Developer</option>
                                            <option value="Junior Developer">Junior Developer</option>
                                            <option value="Senior Developer">Senior Developer</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Student or Learning">
                                                Student or Learning
                    </option>
                                            <option value="Instructor">Instructor or Teacher</option>
                                            <option value="Intern">Intern</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {<div className="invalid-feedback">{errors.status}</div>}
                                        <small className="form-text text-muted">
                                            Give us an idea of where you are at in your career
                  </small>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Company"
                                            name="company"
                                            value={this.state.company}
                                            onChange={this.onChange}
                                        />
                                        <small className="form-text text-muted">
                                            Could be your own company or one you work for
                  </small>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.portfolio
                                            })}
                                            placeholder="Portfolio"
                                            name="portfolio"
                                            value={this.state.portfolio}
                                            onChange={this.onChange}
                                        />
                                        {<div className="invalid-feedback">{errors.portfolio}</div>}
                                        <small className="form-text text-muted">
                                            Could be your own or a company website
                  </small>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Location"
                                            name="location"
                                            value={this.state.location}
                                            onChange={this.onChange}
                                        />
                                        <small className="form-text text-muted">
                                            City & state suggested (eg. Boston, MA)
                  </small>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.skills
                                            })}
                                            placeholder="* Skills"
                                            name="skills"
                                            value={this.state.skills}
                                            onChange={this.onChange}
                                        />
                                        {<div className="invalid-feedback">{errors.skills}</div>}

                                        <small className="form-text text-muted">
                                            Please use comma separated values (eg.
                                            HTML,CSS,JavaScript,PHP)
                  </small>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Github Username"
                                            name="githubusername"
                                            value={this.state.githubusername}
                                            onChange={this.onChange}
                                        />
                                        <small className="form-text text-muted">
                                            If you want your latest repos and a Github link, include
                                            your username
                  </small>
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            className="form-control form-control-lg"
                                            placeholder="A short bio of yourself"
                                            name="bio"
                                            value={this.state.bio}
                                            onChange={this.onChange}
                                        />
                                        <small className="form-text text-muted">
                                            Tell us a little about yourself
                  </small>
                                    </div>
                                    <div className="mb-3">
                                        <button
                                            onClick={() => {
                                                this.setState((prevState) => ({
                                                    displaySocilaInput: !prevState.displaySocilaInput
                                                }));
                                            }}
                                            type="button"
                                            className="btn btn-light"
                                        >
                                            Add Social Network Links
                  </button>
                                        <span className="text-muted">Optional</span>
                                    </div>
                                    {this.state.displaySocilaInput ? (
                                        <div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fab fa-twitter" />
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className={classnames("form-control form-control-lg", {
                                                        "is-invalid": errors.twitter
                                                    })}
                                                    placeholder="Twitter Profile URL"
                                                    name="twitter"
                                                    value={this.state.twitter}
                                                    onChange={this.onChange}
                                                />
                                                {<div className="invalid-feedback">{errors.twitter}</div>}
                                            </div>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fab fa-facebook" />
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className={classnames("form-control form-control-lg", {
                                                        "is-invalid": errors.facebook
                                                    })}
                                                    placeholder="Facebook Page URL"
                                                    name="facebook"
                                                    value={this.state.facebook}
                                                    onChange={this.onChange}
                                                />
                                                {
                                                    <div className="invalid-feedback">
                                                        {errors.facebook}
                                                    </div>
                                                }
                                            </div>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fab fa-linkedin" />
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className={classnames("form-control form-control-lg", {
                                                        "is-invalid": errors.linkedin
                                                    })}
                                                    placeholder="Linkedin Profile URL"
                                                    name="linkedin"
                                                    value={this.state.linkedin}
                                                    onChange={this.onChange}
                                                />
                                                {
                                                    <div className="invalid-feedback">
                                                        {errors.linkedin}
                                                    </div>
                                                }
                                            </div>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fab fa-youtube" />
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className={classnames("form-control form-control-lg", {
                                                        "is-invalid": errors.youtube
                                                    })}
                                                    placeholder="YouTube Channel URL"
                                                    name="youtube"
                                                    value={this.state.youtube}
                                                    onChange={this.onChange}
                                                />
                                                {<div className="invalid-feedback">{errors.youtube}</div>}
                                            </div>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fab fa-instagram" />
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className={classnames("form-control form-control-lg", {
                                                        "is-invalid": errors.instagram
                                                    })}
                                                    placeholder="Instagram Page URL"
                                                    name="instagram"
                                                    value={this.state.instagram}
                                                    onChange={this.onChange}
                                                />
                                                {
                                                    <div className="invalid-feedback">
                                                        {errors.instagram}
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                            ""
                                        )}
                                    <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default EditProfile;
