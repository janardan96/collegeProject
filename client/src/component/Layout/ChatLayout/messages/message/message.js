import React, { useContext } from 'react';
import AuthContext from "../../../../../Provider/AuthContext"

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text }, id }) => {
    let isSentByCurrentUser = false;
    const authContext = useContext(AuthContext);
    console.log("Auth", authContext)
    // const trimmedName = name.trim().toLowerCase();

    if (id !== authContext.user.id) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    {/* <p className="sentText pr-10">{trimmedName}</p> */}
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                    </div>
                    {/* <p className="sentText pl-10 ">{user}</p> */}
                </div>
            )
    );
}

export default Message;