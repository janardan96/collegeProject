import React from "react";
import Moment from "react-moment";

const Experience = (props) => {
    console.log(props.internships)
    const experience = props.internships.map((exp) => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format="DD/MM/YYYY">{exp.from}</Moment> -
        {exp.to === null ? (
                    " Now"
                ) : (
                        <Moment format="DD/MM/YYYY">{exp.to}</Moment>
                    )}
            </td>
            <td>
                <button
                    onClick={() => props.deleteExp(exp._id)}
                    className="btn btn-danger"
                >
                    Delete
        </button>
            </td>
        </tr>
    ));
    return (
        <div>
            <h4 className="mb-4">Experience Credentials</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th />
                    </tr>
                    {experience}
                </thead>
            </table>
        </div>
    );
};

export default Experience;
