
import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './message/message';

import './messages.css';

const Messages = ({ messages, id, msg }) => (
    <ScrollToBottom className="messages">
        {messages.map((message, i) => <div key={i}><Message message={message} id={id} msg={msg} /></div>)}
    </ScrollToBottom>
);

export default Messages;