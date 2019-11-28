import React, { Component } from 'react';
import _ from "lodash"

class SkillSet extends Component {
    render() {
        const { profile } = this.props;

        const skillSet = profile.skills.map((skill, i) => (
            <span key={i} className="badge badge-primary mr-2 p-2">{skill}</span>
        ));
        return (

            <React.Fragment>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-body bg-light mb-3">
                            <h4 className="">About Me</h4>
                            <p className="lead">{_.isEmpty(profile.bio) ? (<span >Does not have a bio</span>) : (<span>{profile.bio}</span>)}
                            </p>
                        </div>
                    </div>

                    <div className="card card-body bg-light mb-3">
                        <h4 className="">Skill Set</h4>
                        <div className="d-flex">
                            {skillSet}
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <h4>Mentors List</h4>
                        {_.isEmpty(profile.friendsList) ? (<span className="text-danger">There is no mentor in your list</span>) : (<span>Hai bhai</span>)}
                    </div>
                </div>
            </React.Fragment>

            // <div className="mb-4">
            //     <h4>Skills</h4>
            //     <div className="d-flex">
            //         {skillSet}
            //     </div>
            // </div>
        )
    }
}

export default SkillSet