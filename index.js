const app = require('express')();
var cors = require('cors');
const http = require('http').Server(app);
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');
const io = require("socket.io")(http, {cors: {
origin: "http://localhost:8888", // or "*"
methods: ["GET", "POST"]}});

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

const botName = 'ChatCord Bot';

io.on('connection', (socket) => {
  
  socket.on('message', msg => {
    io.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));
  });
  
  socket.on('message', msg => {
    io.emit('message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
