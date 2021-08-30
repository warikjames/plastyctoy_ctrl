const app = require('express')();
var cors = require('cors');
const http = require('http').Server(app, {
  cors: {
    origin: '*',
  }
});
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

var corsOptions = {
  origin: 'http://localhost:8888',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', cors(corsOptions), (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
  res.json({msg: 'This is CORS-enabled for all origins!'});
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
