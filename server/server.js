const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const userManager = require('./services/users');

io.on('connection', socket => {
    console.log('A user connected');
    // socket.on('login', )

    socket.on('message', message => console.log(message));

    socket.on('login', (username, room) => {
        console.log(`you are logged in as ${username}`);
        
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


    // socket.emit('message', 'Connected to server');
    // socket.on('message', msg => {
    //     console.log('wtf');
    //     socket.broadcast.emit('message', msg);
    // });
});


const PORT = 4242;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));