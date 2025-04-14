const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

let onlineUsers = {};

io.on('connection', (socket) => {
  let username = null;

  socket.on('set username', (name) => {
    username = name;
    onlineUsers[socket.id] = username;

    io.emit('user count', Object.keys(onlineUsers).length);
    io.emit('system message', `${username} joined the chat.`);
  });

  socket.on('chat message', (msg) => {
    if (username) {
      io.emit('chat message', { username, message: msg });
    }
  });

  socket.on('disconnect', () => {
    if (username) {
      io.emit('system message', `${username} left the chat.`);
      delete onlineUsers[socket.id];
      io.emit('user count', Object.keys(onlineUsers).length);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
