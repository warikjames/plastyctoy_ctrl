const app = require('express')();
var cors = require('cors');
const http = require('http').Server(app);

const io = require("socket.io")(http, {cors: {
origin: "http://localhost:8888", // or "*"
methods: ["GET", "POST"]}});

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

function formatMessage(username, text) {
  return {
    username,
    text
  };
}

const botName = 'ChatCord Bot';

io.on('connection', (socket) => {
  
 socket.on('joinRoom', ({ username, room }) => {
   const user = userJoin(socket.id, username, room);
   
   socket.join(user.room);
   
   socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, 'Someone has joined the chat')
      );
  });
  
  socket.on('message', msg => {
    io.emit('message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
