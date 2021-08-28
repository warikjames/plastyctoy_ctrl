const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', async (socket) => {
  
  const userId = await fetchUserId(socket);
  socket.join(userId);
  io.to(userId).emit('hi');
  
  //socket.broadcast.emit("connection", "Someone connected to the Chat");
  
  //socket.join('some room');
  
  //socket.to('some room').emit("connection", "Someone has joined some room");
  
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
