const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// app.get('/', (req, res) => {
//     res.send('fak');
// });

io.on('connection', socket => {
    console.log('connected !');
});


const PORT = 4242;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));