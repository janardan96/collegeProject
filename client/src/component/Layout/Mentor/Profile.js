import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import ProfileCred from './ProfileCred';
import Spinner from '../Dashboard/spinner';
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";
import ProfileHeader from "./ProfileHeader";
import * as URL from "../../../Provider/api";
import axios from "axios";
import AuthContext from "../../../Provider/AuthContext";
import Navbar from "../Navbar";



const Profile = (props) => {
    const authContext = useContext(AuthContext);
    const [state, setState] = useState({
        profile: null,
        loading: true,
        errors: ""
    })

    // state = {
    //     profile: null,
    //     loading: true,
    //     errors: ""
    // };

    useEffect(() => {
        async function getMentorData(props) {
            console.log("Props menot", props)
            if (props.match.params.userId) {
                const profilesArray = await axios.get(`${URL.mentorProfile}/${props.match.params.userId}`);
                console.log("Profile", profilesArray)
                setState({ loading: false, profile: profilesArray.data });
            }
        }

        getMentorData(props)

    }, [])



    const { profile, loading } = state;
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
                <ProfileHeader profile={profile} auth={authContext.isAuth} mentorId={props.match.params.userId} />
                <ProfileAbout profile={profile} />
                <ProfileCred experience={profile.experience} />
                {profile.githubusername ? <ProfileGithub username={profile.githubusername} /> : null}

            </div>
        )
    }



    return (
        <div>
            <Navbar />
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


export default Profile