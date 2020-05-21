import io from 'socket.io-client';
const ENDPOINT = "http://127.0.0.1:4242";
const socket = io(ENDPOINT);

export function userLogin(username) {
    socket.emit('login', username)
}

export function subscribeToRoom(room, cb) {
    socket.on('message', message => {
        if (message.room === room) {
            cb(message);
        }
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

export function handleCommand(message) {
    let action = message.split(" ")[0].substring(1);
    if (['join', 'nick', 'create', 'delete', 'list', 'part', 'users', 'msg'].includes(action)) {
        let command = message.substring(action.length + 1).trim();
        socket.emit(action, command);
        console.log(command);
        return true;
    } else {
        return action;
    }
}

// export function clientEmitMessage(room, content) {
//     socket.emit('clientMessage', { room, content });
// }

// export function subscribeToGlobalMessage() {
//     socket.on('message', message => {
//         // cb(message);
//     });
// }

export default socket;