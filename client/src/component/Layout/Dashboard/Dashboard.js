import React, { Component } from "react";
import AuthContext from "../../../Provider/AuthContext";
// import { Redirect } from "react-router-dom";
import axios from "axios";
import * as Url from "../../../Provider/api";
import * as Routes from "../../../Provider/route"
import Spinner from "./spinner";
import { Link } from "react-router-dom";
import ProfileAction from "./ProfileAction";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./SkillSet";

class Dashboard extends Component {
    static contextType = AuthContext;
    state = {
        profile: null,
        loading: true,
        mentor: false,
        errors: ""
    };

    async  componentDidMount() {
        // Getting user profile data
        axios
            .get(Url.getProfile, { headers: { Authorization: `${localStorage.getItem("token")}` } })
            .then((res) => {
                this.setState({
                    loading: false,
                    profile: res.data,
                    errors: res.data.noProfile
                });

            })
            .catch((err) => this.setState({ errors: err.response.data }));

        const mentor = await axios.get(Url.mentorProfileSelf, { headers: { Authorization: `${localStorage.getItem("token")}` } });
        if (!mentor.data.noProfile) {
            this.setState({ mentor: true });
        }
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

    // Become Mentor
    mentor = () => {
        if (window.confirm("Are you sure? It will redirect you to creation of mentor profile ")) {
            window.location.href = "/mentor-dashboard";
        }
    }

    render() {
        const { profile, loading } = this.state;
        const { name } = this.context.user;
        const { socket } = this.context
        // console.log(errors);
        // console.log(loading);
        // console.log(profile)
        // console.log(this.context);

        let dashboardContent, mentorLink;
        if (profile === null || loading) {
            dashboardContent = <Spinner />;
        } else {
            mentorLink = profile.category === "Student" ? (this.state.mentor ? (<Link to="/mentor/dashboard" className="btn btn-primary btn-md" >Go to Mentor Profile</Link>
            ) : (<div>
                <Link to="/create-mentor" className="btn btn-primary btn-md" >Become a mentor</Link>
            </div>)) : ""

            if (!profile.noProfile) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome{" "}
                            <strong>{name.charAt(0).toUpperCase() + name.slice(1)}
                            </strong>
                        </p>
                        <ProfileAction />
                        {/* Skills */}
                        {profile.skills.length > 0 ? <Skills profile={profile} socket={socket} /> : ""}
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





        return (
            <div className="dashboard" style={{ marginTop: "56px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <h1 className="display-4  ">Dashboard</h1>
                                {mentorLink}
                            </div>

                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
