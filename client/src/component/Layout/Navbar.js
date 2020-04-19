import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../Provider/route";
import AuthContext from "../../Provider/AuthContext";
import * as URL from "../../Provider/api"
import axios from "axios";
import io from "socket.io-client";

const acceptRequest = async (id, studentId) => {
  try {
    console.log("Iddd", id)
    console.log("StudentId", studentId)
    const senderId = {
      id: id,
      studentId: studentId
    }
    const acceptingRequest = await axios.post(URL.acceptRequest, senderId);
    console.log("Accepting Request", acceptingRequest);
  } catch (error) {

  }
}

const cancelRequest = async (id, studentId) => {
  try {
    console.log("Iddd", id)
    console.log("StudentId", studentId)
    const senderId = {
      id: id,
      studentId: studentId
    }
    const acceptingRequest = await axios.post(URL.cancelRequest, senderId);
    console.log("Accepting Request", acceptingRequest);
  } catch (error) {

  }
}

const LogInSignUp = () => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="nav-link" to={ROUTES.Register}>
        Sign Up
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to={ROUTES.Login}>
        Login
      </Link>
    </li>
  </ul>
);

const LogOutDiv = (props) => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="nav-link" to={ROUTES.Dashboard}>Dashboard</Link>
    </li>
    <li>
      <div className="dropdown">
        <a href="#" className="dropdown ml-2 mr-2" data-toggle="dropdown" id="dropdownMenu1" style={{
          fontSize: "20px", color: "white"
        }}>
          <span className="glyphicon fa fa-bell nav-glyphicon"></span>
          <b className="caret"></b>
          {props.totalRequest.length > 0 ? <span className="label label-primary nav-label-icon" style={{
            fontSize: "12px",
            color: "white",
            background: "#e86464"
          }}>{props.totalRequest.length}</span> : <span className="label label-primary nav-label-icon" style={{
            display: "none"
          }}></span>}

        </a>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1" style={{
          width: "300px",
          left: "-195px",
          height: "300px"
        }}>
          <div className="row mb-2">
            <div className="dropdown-tag d-block">
              <h3 className="text-center dropdown-tag-head" >
                Notification
							</h3>
            </div>
          </div>
          {props.recommendation.length > 0 ? props.recommendation.map((value, i) => <li key={i}>
            <Link to={`/profile/${value.id}`} style={{ color: "#636060" }}>
              <div className="d-flex ml-2 mr-2 align-items-center">
                <div >
                  <img src={value.pic} className="rounded-circle" style={{ width: "40px" }}
                  />
                </div>
                <div >
                  <p id={value.id} style={{
                    margin: "0px",
                    fontSize: "14px",
                    marginLeft: "8px"
                  }}>You have a new Mentor Suggestion : <strong>{value.name}</strong> </p>
                </div>
              </div>
              <hr />
            </Link>
          </li>) : <p className="text-center">No Suggestion</p>}

        </ul>
      </div>
    </li>

    <li>
      <div className="dropdown">
        <a href="#" className="dropdown ml-2 mr-2" data-toggle="dropdown" id="dropdownMenu2" style={{
          fontSize: "20px", color: "white"
        }}>
          <span className="glyphicon fas fa-user nav-glyphicon"></span><b className="caret"></b>
          {props.totalRequest.length > 0 ? <span className="label label-primary nav-label-icon" style={{
            fontSize: "12px",
            color: "white",
            background: "#e86464"
          }}>{props.totalRequest.length}</span> : <span className="label label-primary nav-label-icon" style={{
            display: "none"
          }}></span>}

        </a>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2" style={{
          width: "300px",
          left: "-195px",
          height: "300px"
        }}>
          <div className="row">
            <div className="dropdown-tag d-block">
              <h3 className="text-center dropdown-tag-head" >
                Friend Requests
							</h3>
            </div>
          </div>
          {props.totalRequest.length > 0 ? props.totalRequest.map((value, i) => <li key={i}>
            <div className="col-md-12" style={{ marginTop: "12px" }}>
              <div className="row">
                <div className="col-md-3">
                  <p className="text-center" style={{
                    marginTop: "15px",
                    width: "65px",
                    marginBottom: "0px"
                  }}>
                    <img src={value.profilePic} className="img-circle img-responsive dropdown-img" />
                  </p>
                </div>
                <div className="col-md-9 pleft-0">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-12">
                        <p className="text-left">
                          <strong id={value._id}>{value.studentName}</strong>
                        </p>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-6 col-sm-6 col-xs-6">
                            <button type="submit" name="accept" id="accept_friend" className="btn btn-default drop-accept accept" onClick={() => acceptRequest(props.mentorId, props.totalRequest[i].studentId._id)}><i className="fa fa-check" aria-hidden="true"></i> Accept</button>
                          </div>
                          <div className="col-md-6 col-sm-6 col-xs-6">
                            <button type="submit" name="cancel" className="btn drop-cancel remove" id="cancel_friend">
                              <i className="fa fa-times" aria-hidden="true" onClick={() => cancelRequest(props.mentorId, props.totalRequest[i].studentId._id)}></i> Cancel
												</button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </li>) : <p className="text-center">No Friend Request</p>}

        </ul>
      </div>
    </li>

    <li>
      <a href="/" className="nav-link" onClick={(e) => props.logout(e)}>
        <img
          className="rounded-circle"
          src={props.user.profilePic}
          alt={props.user.name.charAt(0).toUpperCase() + props.user.name.slice(1)}
          style={{ width: "25px", marginRight: "5px" }}
        />
        Logout
      </a>
    </li>
  </ul >
);

const Navbar = (props) => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({})
  const [totalRequest, setRequest] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [newRquest, setNewRequest] = useState([]);
  const [studentId, setId] = useState("");
  const [mentorId, setMentorId] = useState("");
  let socket;

  useEffect(() => {
    if (authContext.isAuth) {
      async function dealMentor() {
        const mentorProfile = await axios.get(URL.getMentorProfile, { headers: { Authorization: `${localStorage.getItem("token")}` } });
        setMentorId(mentorProfile.data._id);
        if (mentorProfile.data._id) {
          const friendRequest = await axios.get(`${URL.getFriendRequest}/${mentorProfile.data._id}`)
          setRequest(friendRequest.data);
        }
        setUser(authContext.user)
        const getProfile = await axios.get(URL.getProfile, { headers: { Authorization: `${localStorage.getItem("token")}` } });
        setId(getProfile.data._id);

        // Recommendation
        const recommendationData = await axios.get(URL.recommendation, { headers: { Authorization: `${localStorage.getItem("token")}` } });

        const allMentorRecomendation = recommendationData.data.recomendation.map(async (el) => {
          const data = await axios.get(`${URL.mentorProfile}/${el.id}`);
          return { id: data.data._id, name: data.data.user.name, pic: data.data.user.profilePic }
        }
        )
        Promise.all(allMentorRecomendation).then(el => setRecommendation(el)
        )
      }
      dealMentor()
    }
  }, []);


  useEffect(() => {
    if (authContext.isAuth) {
      authContext.socket.emit('login', { userId: authContext.user.id, name: authContext.user.name });
    }

  }, [authContext.isAuth, newRquest])


  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to={ROUTES.Dashboard}>
          E- Mentoring Connector
            </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to={ROUTES.MentorsProfile}>
                Mentors
                  </Link>
            </li>
          </ul>

          <div>
            {!authContext.isAuth ? (
              <LogInSignUp />
            ) : (
                <LogOutDiv logout={authContext.logout} user={authContext.user} totalRequest={totalRequest} studentId={studentId} mentorId={mentorId} recommendation={recommendation} />
              )}
          </div>
        </div>
      </div>
    </nav>
  )
}


export default Navbar;
