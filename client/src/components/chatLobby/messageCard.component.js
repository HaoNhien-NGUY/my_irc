import React from 'react';

function MessageCard(props) {
    const { author, time, content, type } = props.messageData;

    return (
        <div className="message-card">
            <h5>{author && <span className={`username ${type === "bot" ? "text-danger" : "text-user"}`}>{author}</span>}<span className="time">{time}</span></h5>
            <p className={author || "info"}>{content}</p>
        </div>
    )
}

export default MessageCard;