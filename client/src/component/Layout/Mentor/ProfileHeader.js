import React, { Component } from 'react';
import _ from "lodash";

class ProfileHeader extends Component {
    render() {
        const { profile } = this.props;

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
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProfileHeader