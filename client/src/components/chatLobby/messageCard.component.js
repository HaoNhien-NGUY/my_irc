import React from 'react';

function MessageCard(props) {
    const { author, time, content } = props.messageData;

    return (
        <div className="message-card">
            <h5><span className="username">{author}</span><span className="time text-secondary">{time}</span></h5>
            <p>{content}</p>
        </div>
    )
}

export default MessageCard;