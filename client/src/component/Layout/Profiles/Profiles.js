import React, { Component } from 'react';
import Spinner from "../Dashboard/spinner";
import * as Url from "../../../Provider/api";
import axios from "axios";
import ProfileItem from './ProfileItems';


class Profiles extends Component {
    state = {
        profiles: null,
        loading: true,
        errors: ""
    };

    async componentDidMount() {
        try {
            const profilesArray = await axios.get(Url.getMentorProfileAll);
            this.setState({ loading: false, profiles: profilesArray.data })
        } catch (error) {
            this.setState({ errors: error.response.data })
        }
    }

    render() {
        const { profiles, loading } = this.state;
        let profileItems;

        if (profiles === null || loading) {
            profileItems = <Spinner />
        }
        else {
            if (profiles.length > 0) {
                profileItems = profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                ))
            }
            else {
                profileItems = <h4>No Profiles Found....</h4>
            }
        }

        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Mentors Profiles</h1>
                            <p className="lead text-center">
                                Browse and connect with mentors
                            </p>
                            {profileItems}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Profiles