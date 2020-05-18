import React, { useState } from 'react';

function ChatInput(props) {

    const [userInput, setuserInput] = useState('');

    const handleChange = (event) => {
        setuserInput(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleMessage(userInput);
        setuserInput('');
    }

    return (
        <div className="message-form">
            <form className="" onSubmit={handleSubmit}>
                <input type="text" className="chat-input pl-3" style={{fontSize:'18px'}} autoComplete="off" placeholder="Enter message" value={userInput} onChange={handleChange} />
                <button type="submit" className="btn btn-primary chat-btn">Send</button>
            </form>
        </div>
    );
}

export default ChatInput;