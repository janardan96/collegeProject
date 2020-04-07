import React from 'react';

import './Input.css';



const Input = ({ setMessage, sendMessage, message, language, updateLanguage }) => {

    const change = (e) => {
        setMessage(e.target.value)
    }

    return (
        <div className='form'>
            <textarea className="textArea" value={message}
                onChange={change}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                placeholder="Enter text here..."></textarea>
            {/* <button className="btn bt-primary" onClick={e => sendMessage(e)}>Send</button> */}
            <input className="btn btn-primary" type="button" value="Send" onClick={e => sendMessage(e)}></input>
            <select
                id="language"
                className="language"
                name="language"
                value={language}
                onChange={updateLanguage}
                style={{
                    borderRadius: "4px",
                    marginLeft: "10px",
                    padding: "3px"
                }}
            >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
            </select>

        </div>

    )
}



export default Input;