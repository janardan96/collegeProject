import React, { Component } from 'react'
import _ from "lodash";

class ProfileAbout extends Component {
    render() {
        const { profile } = this.props

        // Get first name
        const firstName = profile.user.name.trim().split(" ")[0];

        // Skill List 
        const skills = profile.skills.map((skill, i) => (
            <div key={i} className="p-3">
                <i className="fa fa-check" /> {skill}
            </div >
        ))

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-body bg-light mb-3">
                            <h3 className="text-center text-info">{firstName.charAt(0).toUpperCase() + firstName.slice(1)}'s Bio</h3>
                            <p className="lead">{_.isEmpty(profile.bio) ? (<span >{firstName.charAt(0).toUpperCase() + firstName.slice(1)} does not have a bio</span>) : (<span>{profile.bio}</span>)}
                            </p>
                            <hr />
                            <hr />
                            <h3 className="text-center text-info">Skill Set</h3>
                            <div className="row">
                                <div className="d-flex flex-wrap justify-content-center align-items-center">
                                    {skills}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProfileAbout