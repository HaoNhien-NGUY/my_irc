const users = [];

exports.userJoinRoom = (socket, username) => {
    socket.username = username;
    users.push(socket);
}

exports.users = users;