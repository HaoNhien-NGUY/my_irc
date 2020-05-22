const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const moment = require('moment');
const manager = require('./services/manager');

io.on('connection', socket => {
    console.log('A user connected');

    const botInfo = { author: 'chatBOT', type: 'bot' };

    socket.on('login', (username) => {
        socket.username = username;
        manager.userJoinRoom(username, socket.id);
        console.log(`you are logged in as ${username}`);
    });

    //refaire pour inclure les rooms
    socket.on('clientMessage', data => {
        console.log({ ...data, author: socket.username });
        io.in(data.room).emit('message', { ...data, time: moment().format("DD/MM/YYYY HH:mm"), author: socket.username });
    });

    // ------- command from client ------- //
    socket.on('join', data => {
        if (data.command in socket.rooms === false) {
            if (manager.roomExists(data.command)) {

                socket.join(data.command);
                let time = moment().format("DD/MM/YYYY HH:mm");
                socket.to(data.command).emit('message', { content: `${socket.username} has joined the room`, room: data.command, time });
                socket.emit('joinRoom', { name: data.command, time });
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
            socket.to(room).emit('message', { content: `${socket.username} has left the room`, room, time: moment().format("DD/MM/YYYY HH:mm") });
            socket.emit('leaveRoom', room);
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
                    content: `${socket.username} created the room #${roomName}`,
                    room: '_global',
                    time
                });
                socket.emit('message', {
                    content: `You created the room #${roomName}`,
                    room: '_main',
                    time
                });
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
                socket.emit('message', {
                    content: `You deleted the room #${roomName}`,
                    room: '_main',
                    time
                });
                socket.broadcast.emit('message', {
                    content: `${socket.username} deleted the room #${roomName}`,
                    room: '_global',
                    time
                });
                //remove all sockets in room
                io.in(roomToDelete.name).clients((error, socketIds) => {
                    if (error) throw error;
                    socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(roomToDelete.name));
                });
            } else {
                socket.emit('message', { ...botInfo, room: data.room, content: `You can't delete what you don't own !` });
            }
        } else {
            socket.emit('message', { ...botInfo, room: data.room, content: `#${roomName} doesn't exist` });
        }
    });

    socket.on('nick', data => {
        if (data.command && data.command.match(/^[0-9a-zA-Z\s+]+$/)) {
            socket.broadcast.emit('message', {
                content: `@${socket.username} changed username and is now @${data.command}`,
                room: '_global',
                time: moment().format("DD/MM/YYYY HH:mm")
            });
            socket.emit('message', { room: data.room, content: `Your username is now @${data.command}` })
            socket.username = data.command;
        } else {
            socket.emit('message', { ...botInfo, room: data.room, content: 'Please enter a valid username' })
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
        console.log(manager.getRoomsList());
    })

    //event for Main channel,
    //event for all channel

    //get all clients in room

});


const PORT = 4242;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));