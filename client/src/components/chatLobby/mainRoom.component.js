import React, { useState, useEffect, useRef } from 'react';
import ChatInput from './chatInput.component';
import MessageCard from './messageCard.component'
import { botWelcome, botCommandError} from '../../services/chatBot';
import socket, { subscribeToRoom, handleCommand } from '../../socketAPI';

function ChatRoom(props) {
    const [messages, setMessages] = useState([...botWelcome(props.username)]);

    function handleMessage(message) {
        message = message.trim();
        if (message.charAt(0) === "/") {
            let action = handleCommand(message, '_main');
            if(action !== true )
            {
                setMessages([...messages, botCommandError(action)]);
            }
        }
        else if (message !== "") {
            setMessages([...messages,  {author: 'chatBOT', content:`Only type commands here.`, type: 'bot'}])
        }
    }

    //auto scroll down chat box
    const messagesEndRef = useRef(null)
    useEffect(() => {
        messagesEndRef.current.scrollIntoView();
    }, [messages]);


    useEffect(() => {
        function newMessageFN(messageData) {
            setMessages(messages => [...messages, messageData ]);
        }
        subscribeToRoom('_main', newMessageFN);

        return function cleanup() {
            socket.removeListener('message', newMessageFN);
        };
    }, []);

    //userEffect to see connected user
    // 
    // 

    return (
        <div style={{ height: '44rem' }}>
            <div className="container-fluid h-100 mt-2">
                <div className="row h-100">
                    <div className="col-6 pl-0 pr-1 h-100">
                        <div className="left-panel w-100" style={{ height: '100%' }}>

                        </div>
                        <div className="bottom-panel">

                        </div>
                    </div>
                    <div className="col-6 h-100 pr-0">
                        <div style={{ height: '100%' }}>
                            <div className="messages-box">
                                {messages.map((messageData, i) => <MessageCard messageData={messageData} key={i} />)}
                                <div ref={messagesEndRef} />
                            </div>
                            <ChatInput handleMessage={handleMessage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom;