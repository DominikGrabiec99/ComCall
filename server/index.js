const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const socket = require('socket.io');

const io = socket(server);

const users = {};

const socketToRoom = {};

io.on('connection', (socket) => {
  socket.on('join-room', (roomID) => {
    if (users[roomID]) {
      const { length } = users[roomID];
      if (length === 40) {
        socket.emit('room-full');
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }

    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

    socket.emit('all-users', usersInThisRoom);

    socket.on('disconnect', () => {
      const roomID = socketToRoom[socket.id];
      let room = users[roomID];
      if (room) {
        room = room.filter((id) => id !== socket.id);
        users[roomID] = room;
      }
    });
  });

  socket.on('sending signal', (payload) => {
    io.to(payload.userToSignal).emit('user-joined', {
      signal: payload.signal,
      callerID: payload.callerID
    });
  });

  socket.on('returning signal', (payload) => {
    io.to(payload.callerID).emit('receiving returned signal', {
      signal: payload.signal,
      id: socket.id,
      userName: payload.userName
    });
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT || 8000, () => console.log(`server is running on port ${PORT}`));
