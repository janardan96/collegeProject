import React, { Component } from 'react'
import { Link } from "react-router-dom";
import _ from "lodash";

class ProfileItems extends Component {
    render() {
        const { profile } = this.props;
        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">
                        <img src={profile.user.profilePic} alt="" className="rounded-circle" />
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3>{profile.user.name.charAt(0).toUpperCase() + profile.user.name.slice(1)}</h3>
                        <h5>Professional in {profile.profiency}</h5>
                        <p>{profile.status} {_.isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}</p>
                        <p>{_.isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}</p>
                        <Link to={`/profile/${profile.user._id}`} className="btn btn-info">View Profile</Link>
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
}


export default ProfileItems