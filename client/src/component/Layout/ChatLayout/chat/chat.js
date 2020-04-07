import React, { useState, useEffect, useContext } from 'react'
import InfoBar from "../InfoBar/infoBar"
import Input from "../input/input"
import "./chat.css"
import Messages from "../messages/messages"
import AuthContext from "../../../../Provider/AuthContext";



function Chat(props) {
    const authContext = useContext(AuthContext);
    // const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [recieverId, setReciverId] = useState();
    const [language, setLanguage] = useState("en")



    useEffect(() => {
        authContext.socket.emit("joinRequest");
        authContext.socket.on("privateChat", (users) => {
            console.log("private uers", users);
            for (const id in users) {
                if (users[id].userId === props.match.params.id) {
                    console.log("ids", id)
                    setReciverId(id)
                }

            }
        })

    }, [])

    authContext.socket.on('message', (recieveMessage) => {
        console.log("recieve", recieveMessage)
        setMessages([...messages, recieveMessage]);
    });


    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            authContext.socket.emit('sendMessage', { recieverId, senderId: authContext.user.id, message }, () => {
                setMessages([...messages, { recieverId, senderId: authContext.user.id, message }]);
                setMessage('')
            });
        }
    }
    const updateLanguage = (e) => {
        console.log("Language changed", e.target.value)
        authContext.socket.emit("chosen-lang", e.target.value)
        setLanguage(e.target.value);
    }


    return (
        <div className="outerContainer">
            <div className="containerChat">
                <InfoBar />
                <Messages messages={messages} id={recieverId} msg={message} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} language={language} updateLanguage={updateLanguage} />
            </div>
            {/* <TextContainer users={users}/> */}
        </div>
    )
}

export default React.memo(Chat)