const app = require('express')();
var cors = require('cors');
const http = require('http').Server(app);
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const io = require("socket.io")(http, {cors: {
origin: "http://localhost:8888", // or "*"
methods: ["GET", "POST"]}});

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

const botName = 'Bot';

io.on('connection', (socket) => {
  
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  
  
    
  socket.on('message', msg => {
    io.emit('message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
