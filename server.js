const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const moment = require('moment');
const manager = require('./services/manager');
const path = require('path');
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on('connection', socket => {
    const botInfo = { author: 'chatBOT', type: 'bot' };
    console.log('A user connected');

    socket.on('login', (username) => {
        if (username.match(/^[0-9a-zA-Z\s+]{2,32}$/)) {
            if (!manager.usernameFind(username)) {
                socket.username = username;
                manager.userLogin(username, socket.id);
                socket.emit('userInfo', { username, id: socket.id });
                socket.emit('roomListUpdate', manager.getRoomsList());
            } else {
                socket.emit('userInfo', { error: true, message: 'Username already taken.' });
            }
        } else {
            socket.emit('userInfo', { error: true, message: 'Username must only containt alphanumeric values.' });
        }
    });

    socket.on('clientMessage', data => {
        io.in(data.room).emit('message', { ...data, time: moment().format("DD/MM/YYYY HH:mm"), author: socket.username });
    });

    // ------- command from client ------- //
    socket.on('join', data => {
        if (data.command in socket.rooms === false) {
            if (manager.roomExists(data.command)) {
                socket.join(data.command);
                let time = moment().format("DD/MM/YYYY HH:mm");
                socket.to(data.command).emit('message', { content: `@${socket.username} has joined the room`, room: data.command, time });
                socket.emit('joinRoom', { name: data.command, time });

                io.in(data.command).clients((error, socketIds) => {
                    if (error) throw error;
                    let list = []
                    socketIds.forEach(socketId => list.push(`@${io.sockets.sockets[socketId].username}`));
                    io.in(data.command).emit('userListUpdate', { room: data.command, list });
                });
            } else {
                socket.emit('message', { ...botInfo, room: data.room, content: `#${data.command} doesn't exists ! To create it type "/create ${data.command}"` });
            }
        } else {
            socket.emit('message', { ...botInfo, room: data.room, content: `You already are in #${data.command}` });
        }
    });

    socket.on('part', data => {
        let room = !data.command ? data.room : data.command;
        if (room in socket.rooms) {
            socket.leave(room);
            socket.to(room).emit('message', { content: `@${socket.username} has left the room`, room, time: moment().format("DD/MM/YYYY HH:mm") });
            socket.emit('leaveRoom', room);
            io.in(room).clients((error, socketIds) => {
                if (error) throw error;
                let list = []
                socketIds.forEach(socketId => list.push(`@${io.sockets.sockets[socketId].username}`));
                io.in(room).emit('userListUpdate', { room, list });
            });
        } else {
            socket.emit('message', { ...botInfo, room: data.room, content: 'Can\'t leave a room you\'re not in !' });
        }
    });

    socket.on('create', data => {
        roomName = data.command.replace(/\s+/g, '-').replace(/-+/g, '-').toLowerCase();

        if (roomName.match(/^[a-zA-Z-]{3,32}$/)) {
            if (!manager.roomExists(roomName)) {
                manager.roomCreate(roomName, socket.id);
                let time = moment().format("DD/MM/YYYY HH:mm");
                socket.join(roomName);
                socket.emit('joinRoom', { name: roomName, time: moment().format("DD/MM/YYYY HH:mm") });
                socket.broadcast.emit('message', {
                    content: `@${socket.username} created the room #${roomName}`,
                    room: '_global',
                    time
                });
                socket.emit('message', {
                    content: `You created the room #${roomName}`,
                    room: '_main',
                    time
                });
                io.in(roomName).clients((error, socketIds) => {
                    if (error) throw error;
                    let list = []
                    socketIds.forEach(socketId => list.push(`@${io.sockets.sockets[socketId].username}`));
                    io.in(roomName).emit('userListUpdate', { room: roomName, list });
                });
                io.emit('roomListUpdate', manager.getRoomsList());
            } else {
                socket.emit('message', { ...botInfo, room: data.room, content: `#${roomName} already exists ! To join it type  "/join ${roomName}"` });
            }
        } else {
            socket.emit('message', { ...botInfo, room: data.room, content: 'Room name must only contain letters and be between 3 to 32 characters in length' });
        }
    });

    socket.on('delete', data => {
        let roomName = !data.command ? data.room : data.command;
        let roomToDelete = manager.roomExists(roomName);
        if (roomToDelete) {
            if (roomToDelete.owner === socket.id) {
                let time = moment().format("DD/MM/YYYY HH:mm");
                manager.roomDelete(roomToDelete.name);
                io.in(roomToDelete.name).emit('leaveRoom', roomToDelete.name);
                socket.emit('message', { content: `You deleted the room #${roomName}`, room: '_main', time });
                socket.broadcast.emit('message', { content: `@${socket.username} deleted the room #${roomName}`, room: '_global', time });
                //remove all sockets in room
                io.in(roomToDelete.name).clients((error, socketIds) => {
                    if (error) throw error;
                    socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(roomToDelete.name));
                });
                io.emit('roomListUpdate', manager.getRoomsList());
            } else {
                socket.emit('message', { ...botInfo, room: data.room, content: `You can't delete what you don't own !` });
            }
        } else {
            socket.emit('message', { ...botInfo, room: data.room, content: `#${roomName} doesn't exist` });
        }
    });

    socket.on('nick', data => {
        if (!manager.usernameFind(data.command)) {
            if (data.command && data.command.match(/^[0-9a-zA-Z\s+]{2,32}$/)) {
                manager.userChangeUsername(data.command, socket.id);
                socket.broadcast.emit('message', {
                    content: `@${socket.username} changed username and is now @${data.command}`,
                    room: '_global',
                    time: moment().format("DD/MM/YYYY HH:mm")
                });
                socket.emit('message', { room: data.room, content: `Your username is now @${data.command}` });
                socket.emit('userInfo', { username: data.command, id: socket.id });
                socket.username = data.command;
                for (const roomName in socket.rooms) {
                    io.in(roomName).clients((error, socketIds) => {
                        if (error) throw error;
                        let list = []
                        socketIds.forEach(socketId => list.push(`@${io.sockets.sockets[socketId].username}`));
                        io.in(roomName).emit('userListUpdate', { room: roomName, list });
                    });
                }
            } else {
                socket.emit('message', { ...botInfo, room: data.room, content: 'Please enter a valid username' });
            }
        } else {
            socket.emit('message', { ...botInfo, room: data.room, content: 'Username already taken' });
        }
    });

    socket.on('users', data => {
        io.in(data.room).clients((error, socketIds) => {
            if (error) throw error;
            let userList = []
            socketIds.forEach(socketId => userList.push(`@${io.sockets.sockets[socketId].username}`));
            let content = userList.length > 1 ? `Users in room : ${userList.join(' - ')}` : `You're the only one in the room :(`;
            socket.emit('message', { ...botInfo, room: data.room, content });
        });
    });

    socket.on('list', data => {
        let roomArray = manager.getRoomsList(data.command);
        let content = roomArray.length > 0 ? `Rooms available : ${roomArray.join(' - ')}` : `No room available :(`;
        socket.emit('message', { ...botInfo, room: data.room, content });
    });

    socket.on('msg', data => {
        let username = data.command.substring(0, data.command.indexOf(';'));
        let toUser = manager.usernameFind(username);
        if (toUser) {
            let message = data.command.substring(username.length + 2);
            if (message) {
                let time = moment().format("DD/MM/YYYY HH:mm");
                socket.emit('message', { author: `to : ${toUser.username}`, content: message, type: 'user', room: '_main', time })
                io.to(toUser.id).emit('message', { content: message, type: 'user'.type, room: '_main', time, author: `from : ${socket.username}` });
            }
        } else {
            socket.emit('message', { ...botInfo, room: data.room, content: `User "${username}" doesn't exists.` });
        }
    });

    socket.on('disconnecting', function () {
        manager.userRemove(socket.id);
        for (const roomName in socket.rooms) {
            io.to(roomName).emit('message', { content: `${socket.username} has left the room`, room: roomName, time: moment().format("DD/MM/YYYY HH:mm") });
            io.in(roomName).clients((error, socketIds) => {
                if (error) throw error;
                let list = [];
                socketIds.forEach(socketId => {
                    if (io.sockets.sockets[socketId]) list.push(`@${io.sockets.sockets[socketId].username}`);
                });
                io.in(roomName).emit('userListUpdate', { room: roomName, list });
            });
        }
    });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));