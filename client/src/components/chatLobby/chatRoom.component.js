import React, { useState, useEffect, useRef } from 'react';
import ChatInput from './chatInput.component';
import MessageCard from './messageCard.component';
import { botJoinRoom, botCommandError } from '../../services/chatBot';
import socket, { subscribeToRoom, handleCommand } from '../../socketAPI';

function ChatRoom(props) {
    const { room } = props;
    const [messages, setMessages] = useState([botJoinRoom(room)]);

    function handleMessage(message) {
        message = message.trim();
        if (message.charAt(0) === "/") {
            let action = handleCommand(message);
            if(action !== true )
            {
                setMessages([...messages, botCommandError(action)]);
            }
        }
        else if(message !== "") {
            socket.emit('clientMessage', { room: room.name, content: message, type: 'user' });
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
        subscribeToRoom(room.name, newMessageFN);

        return function cleanup() {
            socket.removeListener('message', newMessageFN);
        };
    }, [room.name]);

    //userEffect to see connected user
    // 
    // 

    return (
        <div style={{ height: '44rem' }}>
            <div className="container-fluid h-100 mt-2">
                <div className="row h-100">
                    <div className="col-3 pl-0 pr-1 h-100">
                        <div className="left-panel w-100" style={{ height: '100%' }}>

                        </div>
                        <div className="bottom-panel">

                        </div>
                    </div>
                    <div className="col-9 h-100 pr-0">
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