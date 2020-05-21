const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const moment = require('moment');
const userManager = require('./services/users');

io.on('connection', socket => {
    console.log('A user connected');

    socket.on('login', (username) => {
        socket.username = username;
        console.log(`you are logged in as ${username}`);
    });

    //refaire pour inclure les rooms
    socket.on('clientMessage', data => {
        console.log({ ...data, author: socket.username });
        io.in(data.room).emit('message', { ...data, time: moment().format("DD/MM/YYYY HH:mm"), author: socket.username });
    });

    socket.on('join', room => {
        console.log('joined room');
        //logique if room existe blabla
        socket.join(room);
        let time = moment().format("DD/MM/YYYY HH:mm");
        socket.to(room).emit('message', { content:`${socket.username} has joined the room`, room, time});
        socket.emit('joinRoom', {name: room, time})
    });

    socket.on('part', room => {
        //if room === 'Main' then message you cant leave this room
        console.log(room);
        socket.leave(room);
        socket.to(room).emit('message', { content:`${socket.username} has left the room`, room, time: moment().format("DD/MM/YYYY HH:mm")});
        socket.emit('leaveRoom', room);
    })
    //event for Main channel,
    //event for all channel

    //get all clients in room
    // var clients= io.sockets.adapter.rooms[room].sockets



    // socket.on('message', msg => {
    //     console.log('wtf');
    //     socket.broadcast.emit('message', msg);
    // });
});


const PORT = 4242;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));