import io from 'socket.io-client';
const ENDPOINT = "http://127.0.0.1:4242";
const socket = io(ENDPOINT);

export function userLogin(username) {
    socket.emit('login', username)
}

export function subscribeToRoom(room, cb) {
    socket.on('message', message => {
        if(message.room === room) {
            cb(message);
        } 
    });
}

export function subscribeToCommands() {
    
}

export function roomLeaveListner(cb) {
    socket.on('roomLeave', room => {
        cb(room);
    });
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