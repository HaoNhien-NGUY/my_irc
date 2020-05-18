import io from 'socket.io-client';
const ENDPOINT = "http://127.0.0.1:4242";
const socket = io(ENDPOINT);

export function userLogin(username) {
    socket.emit('login', username)
}

export function subscribeToMessage(cb) {
    socket.on('message', message => {
        cb(message);
    });
}

export default socket;