import React, { useEffect, useState } from 'react';
import _ from "lodash";
import { Link } from "react-router-dom";
import clsx from "clsx";


const SkillSet = (props) => {
    const [activeUsers, setActiveUsers] = useState([]);
    const [allusers, setUsers] = useState({});
    const { profile, socket } = props;

    const stars = [1, 2, 3, 4, 5]

    // const style = {

    // }

    // useEffect(() => {
    socket.on("updated-users", (users) => {
        setUsers(users)
    })
    useEffect(() => {
        for (const j in allusers) {
            setActiveUsers([allusers[j].userId])
        }
    }, [allusers])



    const skillSet = profile.skills.map((skill, i) => (
        <span key={i} className="badge badge-primary mr-2 p-2">{skill}</span>
    ));
    // console.log("Profiles", profile.user.friendsList)
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
                    {_.isEmpty(profile.friendsList) ? (<span className="text-danger">There is no mentor in your list</span>) : profile.friendsList.map((el, i) => (
                        <div className=" row" key={i}>
                            <div className="col-sm-2" style={{
                            }}>
                                <img src={el.profilePic} className="rounded-circle" alt={el.name} style={{ width: "100%" }} />
                            </div>
                            <div className="col-sm-10 d-flex justify-content-between" style={{ paddingTop: "2%", }}>
                                <div>
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

                                <div className="d-flex">
                                    <h6>Rating</h6>
                                    <div className="ml-3 d-flex" >

                                        {stars.map((el, i) => {
                                            return <span className={clsx("fa fa-star", i < 3 && "checked")}></span>
                                        })}
                                    </div>
                                </div>

                            </div>
                        </div>

                    ))}
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

export default SkillSet