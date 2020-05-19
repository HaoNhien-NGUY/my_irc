const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const userManager = require('./services/users');

io.on('connection', socket => {
    console.log('A user connected');

    socket.on('login', (username) => {
        socket.username = username;
        console.log(`you are logged in as ${username}`);
        socket.emit('message', 'Connected to server');

        // userManager.userJoinRoom(socket, username);
        // socket.join('testroom');
        // socket.firstname = 'benoit';
        // console.log(userManager.users);
        // console.log(socket);

        // io.to('testroom').emit('message', 'you are in the testroom');
        // socket.username = username;
        // console.log(socket.username);
        // socket.emit('message', `your username is ${socket.username}`);
    });

    socket.on('clientMessage', message => {
        console.log({...message, author:socket.username});
        io.emit(message.room, {...message,time: 'now', author:socket.username});
    });

    socket.on('joinRoom', room => {
        //logique if room existe blabla
        socket.join(room);
        socket.to(room).emit('nice game', `${socket.username} has joined the chat`);
    });

    //event for global channel,
    //event for all channel


    // socket.on('message', msg => {
    //     console.log('wtf');
    //     socket.broadcast.emit('message', msg);
    // });
});


const PORT = 4242;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));