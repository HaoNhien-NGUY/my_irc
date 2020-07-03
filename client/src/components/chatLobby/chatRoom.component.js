import React, { useState, useEffect, useRef } from 'react';
import ChatInput from './chatInput.component';
import MessageCard from './messageCard.component';
import UserList from './chatroom/userList.component';
import { botJoinRoom, botCommandError } from '../../services/chatBot';
import socket, { subscribeToRoom, subscribeToUserList, handleCommand, sendMessage } from '../../socketAPI';

function ChatRoom(props) {
    const { room } = props;
    const { username } = props.user;
    const [messages, setMessages] = useState([botJoinRoom(room)]);
    const [userList, setUserList] = useState([]);

    function handleMessage(message) {
        message = message.trim();
        if (message.charAt(0) === "/") {
            let action = handleCommand(message, room.name);
            if (action !== true) {
                setMessages([...messages, botCommandError(action)]);
            }
        }
        else if (message !== "") {
            sendMessage(message, room.name);
        }
    }

    function leaveRoom() {
        socket.emit('part', { room: room.name });
    }

    function deleteRoom() {
        socket.emit('delete', { room: room.name });
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
        function userListFN(data) {
            setUserList(data.list);
        }
        subscribeToRoom(room.name, newMessageFN);
        subscribeToUserList(room.name, userListFN);

        return function cleanup() {
            socket.removeListener('message', newMessageFN);
            socket.removeListener('userListUpdate', userListFN);
        };
    }, [room.name]);

    return (
        <div style={{ height: '44rem' }}>
            <div className="container-fluid chat-room h-100 mt-2">
                <div className="row h-100">
                    <div className="col-3 pl-0 pr-1 h-100">
                        <div className="left-panel w-100 container-fluid" style={{ height: '100%' }}>
                            <h2 className="py-3 pl-2 mb-3 room-name">#{room.name}</h2>
                            <UserList list={userList} />
                        </div>
                        <div className="bottom-panel d-flex justify-content-between">
                            <h3 className="px-4 m-0 d-inline-block" style={{overflow : 'hidden', maxWidth: "50%"}}>@{username}</h3>
                            <div className="d-flex">
                                <button onClick={deleteRoom} className="btn btn-danger disabled" style={{ margin: '5px 15px 12px 0px', overflow: "hidden" }}>Delete room</button>
                                <button onClick={leaveRoom} className="btn btn-info" style={{ margin: '5px 15px 12px 0px' }}>leave</button>
                            </div>
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