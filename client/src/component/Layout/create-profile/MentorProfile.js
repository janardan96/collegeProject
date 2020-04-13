import React, { Component } from "react";
// import AuthContext from "../../Provider/AuthContext";
import classnames from "classnames";
import * as Url from "../../../Provider/api";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";


class CreateProfile extends Component {
    state = {
        displaySocilaInput: false,
        profiency: "",
        company: "",
        website: "",
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

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    createProfile = async (createUser) => {
        try {
            await axios.post(Url.createMentorProfile, createUser);
            this.props.history.push("/mentor/add-experience");

        } catch (err) {
            const errors = err.response.data;
            this.setState({ errors: errors });
        }
    };
    onSubmit = async (e, history) => {
        e.preventDefault();
        const CreateUserProfile = {
            profiency: this.state.profiency,
            company: this.state.company,
            website: this.state.website,
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
        this.createProfile(CreateUserProfile);
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
                                <h3 className="display-4 text-center">Create Mentor Profile</h3>
                                <p className="lead text-center">
                                    Let's get some information to make your profile stand out
              </p>
                                <small className="d-block pb-3">* = required field</small>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.profiency
                                            })}
                                            placeholder="*Professional In eg. Web Developement"
                                            name="profiency"
                                            onChange={this.onChange}
                                        />
                                        {<div className="invalid-feedback">{errors.profiency}</div>}

                                        <small className="form-text text-muted">
                                            In which field you are perfect and want to be mentoring

                  </small>
                                    </div>
                                    <div className="form-group">
                                        <select
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.status
                                            })}
                                            name="status"
                                            onChange={this.onChange}
                                        >
                                            <option value="0">* Select Professional Status</option>
                                            <option value="Developer">Developer</option>
                                            <option value="Senior Developer">Senior Developer</option>
                                            <option value="Instructor">Instructor or Teacher</option>
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
                                            placeholder="Company or Institute"
                                            name="company"
                                            onChange={this.onChange}
                                        />
                                        <small className="form-text text-muted">
                                            Could be your Institute or company one you work for
                  </small>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.website
                                            })}
                                            placeholder="Website"
                                            name="website"
                                            onChange={this.onChange}
                                        />
                                        {<div className="invalid-feedback">{errors.status}</div>}
                                        <small className="form-text text-muted">
                                            Could be your company website or portfolio
                  </small>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Location"
                                            name="location"
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

export default CreateProfile;
