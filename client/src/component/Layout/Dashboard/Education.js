import React from "react";
import Moment from "react-moment";

const Education = (props) => {
    const education = props.education.map((edu) => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                <Moment format="DD/MM/YYYY">{edu.from}</Moment> -
        {edu.to === null ? (
                    " Now"
                ) : (
                        <Moment format="DD/MM/YYYY">{edu.to}</Moment>
                    )}
            </td>
            <td>
                <button
                    onClick={() => props.deleteEdu(edu._id)}
                    className="btn btn-danger"
                >
                    Delete
        </button>
            </td>
        </tr>
    ));
    return (
        <div>
            <h4 className="mb-4">Education Credentials</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Years</th>
                        <th />
                    </tr>
                    {education}
                </thead>
            </table>
        </div>
    );
};

export default Education;
