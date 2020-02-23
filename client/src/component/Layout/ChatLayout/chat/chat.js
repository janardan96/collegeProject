import React, { useState, useEffect, useContext } from 'react'
import InfoBar from "../InfoBar/infoBar"
import Input from "../input/input"
import "./chat.css"
import Messages from "../messages/messages"
import AuthContext from "../../../../Provider/AuthContext";
// import io from "socket.io-client";
import * as URL from "../../../../Provider/api"
import axios from "axios"

function Chat(props) {
    const authContext = useContext(AuthContext);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [recieverId, setReciverId] = useState();
    const [language, setLanguage] = useState("en")


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
            if (language !== "en") {
                translateText(message.message, language)
            }
            else {
                setMessages([...messages, message]);
            }

        });
        authContext.socket.on("online", (users) => {
            console.log("uers", users)
        })

    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            authContext.socket.emit('sendMessage', { recieverId, senderId: authContext.user.id, message }, () => { setMessages([...messages, { recieverId, senderId: authContext.user.id, message }]); setMessage('') });
        }
    }
    const updateLanguage = (e) => {
        console.log("Language changed", e.target.value)
        setLanguage(e.target.value);
        // messages.forEach(message => {
        //     translateText(message.message, e.target.value)
        //     console.log("Messages", message.message)
        // })
    }

    const translateText = (message, lang = "en") => {
        // const { text, id } = message;
        axios
            .post(URL.languageTranslate, {
                message,
                lang: lang,
            })
            .then(res => {
                console.log("Translate Text", res.data.TranslatedText)
                setMessages([...messages, res.data.TranslatedText]);
                // const index = messages.findIndex(item => item.id === id);
                // const msg = {
                //     ...message,
                //     text: response.data.TranslatedText,
                // };

                // if (index !== -1) {
                //     messages.splice(index, 1, msg);
                // } else {
                //     messages.push(msg);
                // }

            })
            .catch(console.error)
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

export default Chat