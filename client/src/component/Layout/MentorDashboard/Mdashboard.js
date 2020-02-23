import React, { useEffect, useState, useContext } from 'react';
import AuthContext from "../../../Provider/AuthContext";
import _ from "lodash";
import { Link } from "react-router-dom";
import * as URL from "../../../Provider/api";
import axios from "axios";

const MasterDashboard = () => {
    const authContext = useContext(AuthContext)
    const [activeUsers, setActiveUsers] = useState([]);
    const [profile, setProfile] = useState({})


    useEffect(() => {
        authContext.socket.emit("joinRequest");
        authContext.socket.on("privateChat", (users) => {
            for (const id in users) {
                setActiveUsers([...activeUsers, users[id]])
            }
        })

    }, [])

    console.log("Active users", activeUsers)

    useEffect(() => {
        axios.get(URL.mentorProfileSelf).then(res => {
            setProfile(res.data)
        });

        authContext.socket.on("offline", (users) => {
            for (const j in users) {
                // console.log("Disconnected", users[j]);
                setActiveUsers(activeUsers.filter(el => el = 3 == users[j]))
            }
        })
        return () => {
            authContext.socket.on("online")
        }

    }, []);


    // const skillSet = profile.skills.map((skill, i) => (
    //     <span key={i} className="badge badge-primary mr-2 p-2">{skill}</span>
    // ));
    // // console.log("Profiles", profile.user.friendsList)
    return (

        <React.Fragment>
            <div className=" mb-3 container">
                <h1 className="text-center display-4">Students List</h1>
                {_.isEmpty(profile.friendsList) ? (<span className="text-danger">There is no Student in your list</span>) : profile.friendsList.map((el, i) => (
                    <div className=" row container" key={i}>
                        <div className="col-sm-2" style={{
                        }}>
                            <img src={el.profilePic} className="rounded-circle" alt={el.name} style={{ width: "100%" }} />
                        </div>
                        <div className="col-sm-10" style={{ paddingTop: "2%", }}>
                            <Link to={`/profile/${el.friendId}`}><h3 style={{ position: "relative" }}>{el.friendName[0].toUpperCase() + el.friendName.substring(1)}

                                {activeUsers.includes(el.userId) ? <span style={{
                                    width: "12px",
                                    position: "absolute",
                                    borderRadius: "50%",
                                    height: "12px",
                                    backgroundColor: "#26cd26"
                                }}></span>
                                    : ""}

                            </h3></Link>
                            <Link to={`/user/chat/${el.userId}`}>
                                <button type="button" className="btn btn-primary mt-3">Chat</button>
                            </Link>
                        </div>
                    </div>

                ))}
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

export default MasterDashboard