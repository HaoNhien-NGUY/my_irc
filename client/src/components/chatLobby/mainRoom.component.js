import React, { useState, useEffect, useRef } from 'react';
import ChatInput from './chatInput.component';
import MessageCard from './messageCard.component'
import {welcomeMessage} from '../../services/chatBot';
import socket, { subscribeToRoom } from '../../socketAPI';

function ChatRoom(props) {
    const [messages, setMessages] = useState([...welcomeMessage(props.username)]);

    function handleMessage(message) {
        message = message.trim();
        if (message.charAt(0) === "/") {
            let action = message.split(" ")[0].substring(1);
            if(['join', 'nick', 'create' , 'delete', 'list', 'part', 'users', 'msg'].includes(action)) {
                let command = message.substring(action.length+1).trim();
                socket.emit(action, command);
            } else {
                setMessages([...messages, {author: 'chatBOT', content:`'/${action}' command doesn't exist.`, type: 'bot'}])
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
            console.log(messageData);
            
            setMessages(messages => [...messages, messageData ]);
        }
        subscribeToRoom('Main', newMessageFN);

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