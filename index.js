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

function formatMessage(username, text){
 return {
   username,
   text
 };
}

const botName = "ADMIN";

io.on('connection', (socket) => {
  
  //Welcome
  socket.emit('message', formatMessage(botName,'Welcome to Chat'));
  
  socket.broadcast.emit('message', formatMessage(botName, 'A User has joined'));
  
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName,'A user has left'));
  });
  
            
  socket.on('message', msg => {
    io.emit('message', formatMessage('USER', msg));
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
