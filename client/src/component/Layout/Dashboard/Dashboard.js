import React, { Component } from "react";
import AuthContext from "../../../Provider/AuthContext";
import { Redirect } from "react-router-dom";
import axios from "axios";
import * as Url from "../../../Provider/api";
import * as Routes from "../../../Provider/route"
import Spinner from "./spinner";
import { Link } from "react-router-dom";
import ProfileAction from "./ProfileAction";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
    static contextType = AuthContext;
    state = {
        profile: null,
        loading: true,
        errors: ""
    };

    componentDidMount() {
        // Getting user profile data
        axios
            .get(Url.getProfile, {
                headers: { Authorization: `${localStorage.getItem("token")}` }
            })
            .then((res) => {
                this.setState({
                    loading: false,
                    profile: res.data,
                    errors: res.data.noProfile
                });
            })
            .catch((err) => this.setState({ errors: err.response.data }));
    }

    // Delete Experience
    onDeleteExp = async (id) => {
        const deleteExp = await axios.delete(`${Url.deleteInternship}/${id}`);
        this.setState({
            profile: deleteExp.data
        });
    };

    onDeleteEdu = async (id) => {
        const deleteEdu = await axios.delete(`${Url.deleteEducation}/${id}`);
        this.setState({ 
            profile: deleteEdu.data
        });
    };

    // Delete account Profile
    onDeleteClick = async (e) => {
        await this.context.deleteAccount(e);
    };

    render() {
        const { profile, loading } = this.state;
        const { name } = this.context.user;
        // console.log(errors);
        // console.log(loading);
        console.log(profile);
        // console.log(this.context);

        let dashboardContent;
        if (profile === null || loading) {
            dashboardContent = <Spinner />;
        } else {
            if (!profile.noProfile) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome{" "}
                            <Link to={`/profile/${profile.handle}`}>
                                {name.charAt(0).toUpperCase() + name.slice(1)}
                            </Link>
                        </p>
                        <ProfileAction />
                        {/* Internships */}
                        {profile.internships.length > 0 ? <Experience
                            internships={profile.internships}
                            deleteExp={this.onDeleteExp}
                        /> : ""}
                        {/* Education */}
                        {profile.education.length > 0 ? <Education
                            education={profile.education}
                            deleteEdu={this.onDeleteEdu}
                        /> : ""}



                        <div style={{ marginBottom: "60px" }} />
                        <button onClick={this.onDeleteClick} className="btn btn-danger">
                            Delete My Account
            </button>
                    </div>
                );
            } else {
                dashboardContent = (
                    <div style={{ height: "59vh" }}>
                        <p className="lead text-muted">
                            Welcome {name.charAt(0).toUpperCase() + name.slice(1)}
                        </p>
                        <p>You have not setup a profile, please create your profile</p>
                        <Link to={Routes.CreateProfile} className="btn btn-lg btn-info">
                            Create Profile
            </Link>
                    </div>
                );
            }
        }

        return !this.context.isAuth ? (
            <Redirect to="/login" />
        ) : (
                <div className="dashboard" style={{ marginTop: "56px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="display-4">Dashboard</h1>
                                {dashboardContent}
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}

export default Dashboard;
