var users = [];
var rooms = [];

//send message to all rooms 


exports.userJoinRoom = (username, id) => {
    users.push({id, username});
}

exports.roomCreate = (name, owner) => {
    rooms.push({ name, owner });
}

exports.roomDelete = (roomToDelete) => {
    rooms = rooms.filter(room => room.name !== roomToDelete);
}

exports.getRoomsList = () => {
    return rooms.map(room => room.name);
}

exports.roomExists = (roomToFind) => {
    return (rooms.find(room => room.name === roomToFind));
}


// exports.users = users;
// exports.rooms = rooms;

//if room is deleted, i have to remove it from all users

//users = [{id: socketid, username: username}]

//to find user in room
//users.filter(user => user.room.includes(roomname))

//to find socket by id
//io.sockets.connected[id]

//to get socket id in room
//(io.sockets.adapter.rooms[data.command].sockets);

//get all username in room 
exports.usersInRoom = (roomName) => {
    const socketIDs = io.sockets.adapter.rooms[roomName].sockets;
    for(const id in socketIDs) {
        
    }
}

// io.in(roomToDelete.name).clients((error, socketIds) => {
//     if (error) throw error;
//     let userList = []
//     socketIds.forEach(socketId => userList.push(io.sockets.sockets[socketId].username));
//     console.log(userList); 
// });