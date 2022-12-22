const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  const sessionID = socket.id;
  console.log('a user connected');
  io.emit('connectionsId',socket.id.substr(0, 2));
  io.emit('connections',`${socket.id.substr(0, 2)} is connected`);

  socket.on('message', (message) => {
    console.log(message);
    // io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
    io.emit('message', { user: socket.id.substr(0, 2), message: message});
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    io.emit('connections',`${socket.id.substr(0, 2)} is disconnected`)
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));