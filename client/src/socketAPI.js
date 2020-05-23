import io from 'socket.io-client';
const ENDPOINT = "http://127.0.0.1:4242";
const socket = io(ENDPOINT);

export function userLogin(username) {
    socket.emit('login', username)
}

export function subscribeToRoom(room, cb) {
    socket.on('message', message => {
        if (message.room === room || message.room === "_global") {
            cb(message);
        }
    });
}

export function subscribeToUserList(room, cb) {
    socket.on('userListUpdate', data => {
        if (data.room === room){
            cb(data);
        }
    });
}

export function subscribeToRoomList(cb) {
    socket.on('roomListUpdate', list => {
        cb(list);
    });
}

export function sendMessage(content, room) {
    socket.emit('clientMessage', { room, content, type: 'user' });
}

export function userInfoListner(cb) {
    socket.on('userInfo', user => {
        cb(user);
    });
}

export function joinRoomListner(cb) {
    socket.on('joinRoom', roomData => {
        cb(roomData);
    })
}

export function leaveRoomListner(cb) {
    socket.on('leaveRoom', room => {
        cb(room);
    });
}

export function handleCommand(message, room) {
    let action = message.split(" ")[0].substring(1);
    if (['join', 'nick', 'create', 'delete', 'list', 'part', 'users', 'msg'].includes(action)) {
        let command = message.substring(action.length + 1).trim().replace(/\s\s+/g, ' ');;
        socket.emit(action, {command, room});
        return true;
    } else {
        return action;
    }
}

export default socket;