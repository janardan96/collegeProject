import React, { Component } from 'react';
import _ from "lodash";
import StarRatings from 'react-star-ratings';
import * as URL from "../../../Provider/api";
import axios from "axios";


class ProfileHeader extends Component {

    state = {
        rating: 0,
        userReview: []
    };


    async componentDidMount() {
        const user = await axios.get(`${URL.getStar}`);
        user.data.forEach(el => {
            if (this.props.mentorId === el.mentorId) {
                return this.setState({
                    rating: el.stars
                })
            }
        })


    }

    render() {
        const { profile, auth } = this.props;
        console.log("Staersa", this.state)
        console.log("Props", this.props)

        const changeRating = async (newRating) => {
            const res = await axios.post(`${URL.giveStar}/${this.props.mentorId}`, { star: newRating })
            this.setState({
                rating: newRating
            });
            console.log("New Rating", res);
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-body bg-info text-white mb-3">
                            <div className="row">
                                <div className="col-4 col-md-3 m-auto">
                                    <img className="rounded-circle" src={profile.user.profilePic} alt={profile.user.name.charAt(0).toUpperCase() + profile.user.name.slice(1)} />
                                </div>
                            </div>
                            <div className="text-center">
                                <h1 className="display-4 text-center">{profile.user.name.charAt(0).toUpperCase() + profile.user.name.slice(1)}</h1>
                                <p className="lead text-center">{profile.status} {_.isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}</p>
                                {_.isEmpty(profile.location) ? null : (<p>{profile.location}</p>)}
                                <p>
                                    {_.isEmpty(profile.portfolio) ? null : (<a className="text-white p-2" href={profile.portfolio} target="_blank" rel="noopener noreferrer">
                                        <i className="fas fa-globe fa-2x"></i>
                                    </a>)}

                                    {_.isEmpty(profile.social && profile.social.twitter) ? null : (<a className="text-white p-2" href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-twitter fa-2x"></i>
                                    </a>)}

                                    {_.isEmpty(profile.social && profile.social.facebook) ? null : (<a className="text-white p-2" href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-facebook fa-2x"></i>
                                    </a>)}

                                    {_.isEmpty(profile.social && profile.social.linkedin) ? null : (<a className="text-white p-2" href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-linkedin fa-2x"></i>
                                    </a>)}
                                    {_.isEmpty(profile.social && profile.social.youtube) ? null : (<a className="text-white p-2" href={profile.social.youtube} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-youtube fa-2x"></i>
                                    </a>)}

                                    {_.isEmpty(profile.social && profile.social.instagram) ? null : (<a className="text-white p-2" href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-instagram fa-2x"></i>
                                    </a>)}

                                </p>
                                {auth ? <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor="orange"
                                    changeRating={changeRating}
                                    starHoverColor="orange"
                                    numberOfStars={5}
                                    starDimension="28px"
                                    starSpacing="3px"
                                    name='rating'
                                // onStarClick={this.onStarClick.bind(this)}
                                /> : ""}

                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProfileHeader