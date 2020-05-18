import React, { useState, useEffect } from 'react';
import ChatInput from './chatInput.component';
import ChatMessages from './chatMessages.component';
import socket, {subscribeToMessage} from '../../socketAPI';

function ChatRoom(props) {

    const [messages, setMessages] = useState([]);
    let msg = {author: 'golf', date: '20/02/20', content:'bonjour le monde'};

    const handleMessage = (message) => {
        // setMessages([...messages, {author: props.username, date: 'date here', content: message}]);
        socket.emit('message', message);
    }

    useEffect(() => {
        subscribeToMessage(messageData => console.log(messageData) );
    });

    return (
        <div style={{height:'35rem'}}>
            <div className="container-fluid h-100 mt-2 px-5">
                <div className="row h-100">
                    <div className="col-3 pr-1 h-100">
                        <div className="user-list w-100" style={{height: '100%'}}>

                        </div>
                        <div className="bottom-panel">

                        </div>
                    </div>
                    <div className="col-9 h-100"> {/* style={{paddingLeft:'8px'}} */}
                        <div style={{height: '100%'}}>
                            <ChatMessages />
                            <ChatInput handleMessage={handleMessage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom;