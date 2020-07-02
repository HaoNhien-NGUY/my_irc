import React from 'react';
import socket from '../../../socketAPI';

function ListItem(props) {
    const { room } = props;

    function joinRoom() {
        socket.emit('join', {room: '_main', command: room.substring(1)});
    }

    return (
        <div className="list-item ml-4 mr-3 my-3 d-flex justify-content-between">
            <span>{room}</span>
            <button onClick={joinRoom} className="btn btn-outline-success">Join</button>
        </div>
    )
}

export default ListItem;