import React, { Component } from 'react';
import Spinner from "../Dashboard/spinner";
import * as Url from "../../../Provider/api";
import axios from "axios";
import ProfileItem from './ProfileItems';
// import io from "socket.io-client";


// let socket = io('localhost:5000')
class Profiles extends Component {

    state = {
        profiles: null,
        loading: true,
        errors: "",
        profile: null,
        friendRequest: '',
        studentId: ""
    };

    sendRequest = async (id) => {
        console.log("adsfadsfre", id);
        try {
            const sendRequestId = {
                id: id,
                studentId: this.state.studentId
            };
            const sendingRequest = await axios.post(Url.sendFriendRequest, sendRequestId);
            console.log("Request is sneded", sendingRequest)
        } catch (error) {
            console.log(error)
        }

        // socket.emit("friendRequest", {
        //     receiver: id,
        //     sender: this.state.profile._id
        // })
    }

    async componentDidMount() {
        try {
            const profilesArray = await axios.get(Url.getMentorProfileAll);
            const currentUser = await axios
                .get(Url.getProfile, { headers: { Authorization: `${localStorage.getItem("token")}` } })
            this.setState({
                loading: false,
                profile: currentUser.data.user,
                studentId: currentUser.data._id
            });

            // var param = {
            //     sender: this.state.profile._id
            // }
            // socket.emit('joinRequest', param, () => {
            //     console.log("Joined in profile component")
            // })
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
                    <ProfileItem key={profile._id} profile={profile} sendRequest={this.sendRequest} />
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