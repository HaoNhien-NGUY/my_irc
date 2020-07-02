import React, { useState, useEffect, useRef } from 'react';
import ChatInput from './chatInput.component';
import MessageCard from './messageCard.component';
import RoomList from './home/roomList.component';
import ActionPanel from './home/actionPanel.component';
import { botWelcome, botCommandError } from '../../services/chatBot';
import socket, { subscribeToRoom, handleCommand, subscribeToRoomList } from '../../socketAPI';

function ChatRoom(props) {
    const { username } = props.user;
    const [messages, setMessages] = useState([...botWelcome(username)]);
    const [roomList, setRoomList] = useState([]);

    function handleMessage(message) {
        message = message.trim();
        if (message.charAt(0) === "/") {
            let action = handleCommand(message, '_main');
            if (action !== true) {
                setMessages([...messages, botCommandError(action)]);
            }
        }
        else if (message !== "") {
            setMessages([...messages, { author: 'chatBOT', content: `Only type commands here.`, type: 'bot' }])
        }
    }

    //auto scroll down chat box
    const messagesEndRef = useRef(null)
    useEffect(() => {
        messagesEndRef.current.scrollIntoView();
    }, [messages]);


    useEffect(() => {
        function newMessageFN(messageData) {
            setMessages(messages => [...messages, messageData]);
        }
        function roomListFN(list) {
            setRoomList(list);
        }
        subscribeToRoom('_main', newMessageFN);
        subscribeToRoomList(roomListFN);

        return function cleanup() {
            socket.removeListener('message', newMessageFN);
            socket.removeListener('roomListUpdate', roomListFN);
        };
    }, []);

    //userEffect to see connected user
    // 
    // 

    return (
        <div style={{ height: '44rem' }}>
            <div className="container-fluid home-panel h-100 mt-2">
                <div className="row h-100">
                    <div className="col-6 pl-0 pr-1 h-100">
                        <div className="left-panel w-100 container-fluid" style={{ height: '100%' }}>
                            <h1 className="pl-3 py-3">my_irc<small style={{fontSize :"15px", paddingLeft : "10px" }} >By NGUYEN Hao-Nhien.</small></h1>
                            <div className="row" style={{ height: '84%', paddingTop: '26px' }}>
                                <RoomList list={roomList} />
                                <ActionPanel room={'_main'} username={username} />
                            </div>
                        </div>
                        <div className="bottom-panel">
                            <h3 className="px-4 d-inline-block">@{username}</h3>
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