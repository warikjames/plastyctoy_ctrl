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

io.on('connection', (socket) => {
  
  socket.join('some Room);
              
  socket.on('message', msg => {
    io.to('some room').emit('message', msg);
  });      
  
  socket.on('message', msg => {
    io.emit('message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
