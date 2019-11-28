import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Url from "../../../Provider/api";
import classnames from "classnames";

class AddEducation extends Component {
    state = {
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: "",
        errors: {},
        disabled: false
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onCheck = (e) => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    };
    addEducation = async (userData, history) => {
        try {
            const userExperience = await axios.post(Url.addEducation, userData);
            this.props.history.push("/dashboard");
            console.log(userExperience);
        } catch (error) {
            this.setState({ errors: error.response.data });
            console.log("Error is ", error.response);
        }
    };

    onSubmit = async (e) => {
        e.preventDefault();
        const CreateUserProfile = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            description: this.state.description
        };
        this.addEducation(CreateUserProfile);
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="section add-experience" style={{ marginTop: "90px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
              </Link>
                            <h1 className="display-4 text-center">Add Your Education</h1>
                            <p className="lead text-center">
                                Add an education that you have done
              </p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.school
                                        })}
                                        placeholder="* School Or University"
                                        name="school"
                                        value={this.state.school}
                                        onChange={this.onChange}
                                    />
                                    {<div className="invalid-feedback">{errors.school}</div>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.degree
                                        })}
                                        placeholder="* Degree Or certificate"
                                        name="degree"
                                        value={this.state.degree}
                                        onChange={this.onChange}
                                    />
                                    {<div className="invalid-feedback">{errors.degree}</div>}
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.studyField
                                        })}
                                        placeholder="Field Of Study"
                                        name="fieldofstudy"
                                        value={this.state.fieldofstudy}
                                        onChange={this.onChange}
                                    />
                                    {<div className="invalid-feedback">{errors.studyField}</div>}
                                </div>
                                <h6>From Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.dateField
                                        })}
                                        name="from"
                                        value={this.state.from}
                                        onChange={this.onChange}
                                    />
                                    {<div className="invalid-feedback">{errors.dateField}</div>}
                                </div>
                                <h6>To Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        disabled={this.state.disabled ? "disabled" : null}
                                        error={errors.to}
                                        name="to"
                                        value={this.state.to}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-check mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        id="current"
                                        onChange={this.onCheck}
                                    />
                                    <label className="form-check-label" htmlFor="current">
                                        Current Job
                  </label>
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        placeholder="Program Description"
                                        name="description"
                                        value={this.state.description}
                                        error={errors.description}
                                        onChange={this.onChange}
                                    />
                                    <small className="form-text text-muted">
                                        Tell us about your experience and what you learned{" "}
                                    </small>
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

export default AddEducation;
