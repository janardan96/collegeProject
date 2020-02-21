import React, { useState, useEffect, useContext } from 'react'
import InfoBar from "../InfoBar/infoBar"
import Input from "../input/input"
import "./chat.css"
import Messages from "../messages/messages"
import AuthContext from "../../../../Provider/AuthContext";
import io from "socket.io-client"

function Chat(props) {
    const authContext = useContext(AuthContext);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [recieverId, setReciverId] = useState();


    useEffect(() => {
        // console.log("happy'", authContext.allallConnectedUser)
        authContext.socket.emit("joinRequest");
        authContext.socket.on("privateChat", (users) => {
            console.log("uers", users);
            for (const id in users) {
                if (users[id] === props.match.params.id) {
                    console.log("ids", id)
                    setReciverId(id)
                }
            }
        })

    }, [])

    useEffect(() => {
        authContext.socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
        authContext.socket.on("online", (users) => {
            console.log("uers", users)
        })

    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            authContext.socket.emit('sendMessage', { recieverId, message }, () => setMessage(''));
        }
        setMessage("");
    }

    return (
        <div className="outerContainer">
            <div className="containerChat">
                <InfoBar />
                <Messages messages={messages} id={recieverId} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            {/* <TextContainer users={users}/> */}
        </div>
    )
}

export default Chat