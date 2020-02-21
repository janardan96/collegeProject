import React from 'react';

import './Input.css';



const Input = ({ setMessage, sendMessage, message }) => {

    const change = (e) => {
        console.log(e.target.value)
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

        </div>

    )
}



export default Input;