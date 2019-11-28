// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import classnames from "classnames";
// import * as Url from "../../../Provider/api";

// class Addexperience extends Component {
//     state = {
//         company: "",
//         title: "",
//         location: "",
//         from: "",
//         to: "",
//         current: false,
//         description: "",
//         errors: {},
//         disabled: false
//     };

//     onChange = (e) => {
//         this.setState({ [e.target.name]: e.target.value });
//     };

//     onCheck = (e) => {
//         this.setState((prevState) => {
//             return {
//                 disabled: !prevState.disabled,
//                 current: !prevState.current
//             };
//         });
//         console.log(this.state.current);
//         console.log(this.state.disabled);
//     };
//     addExperience = async (userData) => {
//         try {
//             await axios.post(Url.mentorExperience, userData);
//             this.props.history.push("/mentor/dashboard");
//             // console.log(userExperience);
//         } catch (error) {
//             this.setState({ errors: error.response.data });
//             // console.log(error);
//         }
//     };

//     onSubmit = async (e, history) => {
//         e.preventDefault();
//         const CreateUserProfile = {
//             company: this.state.company,
//             title: this.state.title,
//             location: this.state.location,
//             from: this.state.from,
//             to: this.state.to,
//             description: this.state.description
//         };
//         this.addExperience(CreateUserProfile);
//     };

//     render() {
//         const { errors } = this.state;
//         return (
//             <div className="section add-experience" style={{ marginTop: "90px" }}>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-8 m-auto">
//                             <Link to="/create-mentor" className="btn btn-light">
//                                 Go Back
//               </Link>
//                             <h1 className="display-4 text-center">Add Your Experience</h1>
//                             <p className="lead text-center">
//                                 Add any developer/programming positions that you have had in the
//                                 past
//               </p>
//                             <small className="d-block pb-3">* = required field</small>
//                             <form onSubmit={this.onSubmit}>
//                                 <div className="form-group">
//                                     <input
//                                         type="text"
//                                         className="form-control form-control-lg"
//                                         placeholder="* Job Title"
//                                         name="title"
//                                         required
//                                         value={this.state.title}
//                                         onChange={this.onChange}
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <input
//                                         type="text"
//                                         className="form-control form-control-lg"
//                                         placeholder="* Company"
//                                         name="company"
//                                         value={this.state.company}
//                                         required
//                                         onChange={this.onChange}
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <input
//                                         type="text"
//                                         className="form-control form-control-lg"
//                                         placeholder="Location"
//                                         name="location"
//                                         value={this.state.location}
//                                         onChange={this.onChange}
//                                     />
//                                 </div>
//                                 <h6>From Date</h6>
//                                 <div className="form-group">
//                                     <input
//                                         type="date"
//                                         className={classnames("form-control form-control-lg", {
//                                             "is-invalid": errors.from
//                                         })} name="from"
//                                         value={this.state.from}
//                                         onChange={this.onChange}
//                                     />
//                                     {<div className="invalid-feedback">{errors.from}</div>}

//                                 </div>
//                                 <h6>To Date</h6>
//                                 <div className="form-group">
//                                     <input
//                                         type="date"
//                                         className="form-control form-control-lg"
//                                         disabled={this.state.disabled ? "disabled" : null}
//                                         error={errors.to}
//                                         name="to"
//                                         value={this.state.to}
//                                         onChange={this.onChange}
//                                     />
//                                 </div>
//                                 <div className="form-check mb-4">
//                                     <input
//                                         className="form-check-input"
//                                         type="checkbox"
//                                         name="current"
//                                         value={this.state.current}
//                                         checked={this.state.current}
//                                         id="current"
//                                         onChange={this.onCheck}
//                                     />
//                                     <label className="form-check-label" htmlFor="current">
//                                         Current Job
//                   </label>
//                                 </div>
//                                 <div className="form-group">
//                                     <textarea
//                                         className="form-control form-control-lg"
//                                         placeholder="Job Description"
//                                         name="description"
//                                         value={this.state.description}
//                                         error={errors.description}
//                                         onChange={this.onChange}
//                                     />
//                                     <small className="form-text text-muted">
//                                         Some of your responsabilities, etc
//                   </small>
//                                 </div>
//                                 <input type="submit" className="btn btn-info btn-block mt-4" />
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default Addexperience;
