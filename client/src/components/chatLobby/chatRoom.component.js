import React, { useState } from 'react';
import ChatInput from './chatInput.component';

function chatRoom() {

    const handleMessage = (message) => {
        console.log(message);
    }

    return (
        <div className="vh-100">
            <ChatInput handleMessage={handleMessage}/>
        </div>
    )
}

export default chatRoom;