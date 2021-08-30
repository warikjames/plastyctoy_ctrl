const app = require('express')();
var cors = require('cors');
const http = require('http').Server(app, {
  handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

io.origins('*:*');


app.get('/', (req, res, next) => {
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
