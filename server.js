/* Server */

// Require socket.io
const io = require('socket.io')(3000);

// When a new user reaches the server -> send 'hello world' to client
io.on('connection', socket => {
    console.log('new user');
    socket.emit('chat-message', 'Hello World');
});