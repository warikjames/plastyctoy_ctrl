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

function formatMessage(username, text) {
  return {
    username,
    text
  };
}

const users = [];

function userJoin(id, username, room){
  const user = {id, username, room};
  
  users.push(user);
  
  return user;
}

// function getCurrentUser(id){
//   return users.find(user => user.id === id);
// }
  

const botName = "ADMIN";

io.on('connection', (socket) => {
 socket.on('joinRoom', ({username, room}) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
   
//     socket.emit('message', formatMessage(user.username,user.room));

    //Welcome
    socket.emit('message', formatMessage(botName,'Welcome to Chat'));

    socket.broadcast.emit('message', formatMessage(botName, `${user.username} has joined ${user.room}'));
     
    });
     
  socket.on('message', msg => {
    io.emit('message', formatMessage('USER', msg));
  });
  
     socket.on('disconnect', () => {
      io.emit('message', formatMessage(botName,'A user has left'));
    });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
