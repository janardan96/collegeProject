import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ProfileCred from './ProfileCred';
import Spinner from '../Dashboard/spinner';
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";
import ProfileHeader from "./ProfileHeader";
import * as URL from "../../../Provider/api";
import axios from "axios";


class Profile extends Component {

    state = {
        profile: null,
        loading: true,
        errors: ""
    };

    async componentDidMount() {
        try {
            if (this.props.match.params.userId) {
                const profilesArray = await axios.get(`${URL.individualProfile}/${this.props.match.params.userId}`);
                this.setState({ loading: false, profile: profilesArray.data });
            }

        } catch (error) {
            this.setState({ errors: error.response.data })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile === null && this.props.profile.loading) {
            this.props.history.push();
        }
    }
    render() {

        const { profile, loading } = this.state;
        let profileContent;
        if (profile === null || loading) {
            profileContent = <Spinner />
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">Back To Profiles</Link>
                        </div>
                        <div className="col-md-6"></div>
                    </div>
                    <ProfileHeader profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileCred education={profile.education} experience={profile.internships} />
                    {profile.githubusername ? <ProfileGithub username={profile.githubusername} /> : null}

                </div>
            )
        }



        return (
            <div>
                <div className="profile">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                {profileContent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Profile