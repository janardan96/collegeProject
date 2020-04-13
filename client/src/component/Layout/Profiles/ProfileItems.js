import React, { Component, useContext } from 'react'
import { Link } from "react-router-dom";
import _ from "lodash";
import AuthContext from "../../../Provider/AuthContext";
import clsx from "clsx"

const ProfileItems = (props) => {
    const authContext = useContext(AuthContext);
    console.log("Profile", authContext.user)

    const { profile } = props;
    const stars = [1, 2, 3, 4, 5]
    const totalStar = profile.review.reduce((el, value) => {
        return el + value.stars
    }, 0);
    // console.log("Ttotlta", totalStar)
    return (
        <div className="card card-body bg-light mb-3">
            <div className="row">
                <div className="col-2">
                    <img src={profile.user.profilePic} alt="" className="rounded-circle" />
                </div>
                <div className="col-lg-6 col-md-4 col-8">
                    <div className="d-flex align-items-center">
                        <h3>{profile.user.name.charAt(0).toUpperCase() + profile.user.name.slice(1)}</h3>
                        <div className="ml-4">

                            {stars.map((el, i) => {
                                return <span key={i} className={clsx("fa fa-star", (i < (Math.floor(totalStar / profile.review.length)) && profile.review.length) && "checked")}></span>
                            })}
                        </div>
                    </div>

                    <h5>Professional in {profile.profiency}</h5>
                    <p>{profile.status} {_.isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}</p>
                    <p>{_.isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}</p>
                    <Link to={`/profile/${profile._id}`} className="btn btn-primary">View Profile</Link>
                    {authContext.isAuth ? <button className="btn btn-primary ml-3" onClick={() => this.props.sendRequest(profile._id)}>Sent Request</button> : ""}

                </div>
                <div className="col-md-4 d-none d-md-block">
                    <h4>Skill Set</h4>
                    <ul className="list-group">
                        {profile.skills.slice(0, 4).map((skill, index) => (
                            <li key={index} className="list-group-item">
                                <i className="fa fa-check pr-1" />
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )

}


export default ProfileItems