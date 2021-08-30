const app = require('express')();
var cors = require('cors');
const http = require('http').Server(app, {
  cors: {
    origin: "https://example.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

io.origins((origin, callback) => {
  if (origin !== 'http://localhost:8888') {
      return callback('origin not allowed', false);
  }
  callback(null, true);
});
app.ge
t('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  
  console.log("Connected!");
  
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
