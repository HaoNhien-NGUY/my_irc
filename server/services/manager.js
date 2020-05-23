var users = [];
var rooms = [];

exports.userLogin = (username, id) => {
    users.push({ id, username });
}

exports.userChangeUsername = (username, socketid) => {
    var index = users.findIndex(user => user.id == socketid);
    users[index].username = username;
}

exports.usernameFind = (username) => {
    username = username.toLowerCase();
    return users.find(user => user.username.toLowerCase() === username);
}

exports.userRemove = (id) => {
    users = users.filter(user => user.id !== id);
}

exports.roomCreate = (name, owner) => {
    rooms.push({ name, owner });
}

exports.roomDelete = (roomToDelete) => {
    rooms = rooms.filter(room => room.name !== roomToDelete);
}

exports.roomExists = (roomToFind) => {
    return (rooms.find(room => room.name === roomToFind));
}

exports.getRoomsList = (search) => {
    const matches = search ? rooms.filter(room => room.name.includes(search)) : rooms;
    return matches.map(room => `#${room.name}`);
}