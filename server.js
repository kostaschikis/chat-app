/* Server */

// Require socket.io
const io = require('socket.io')(3000);

const users = {};

// When a new user reaches the server -> send 'hello world' to client
io.on('connection', socket => {

    // New User Handler | 'new-user' event
    socket.on('new-user', name => {
        users[socket.id] = name;
        // Send to everyone who connected | 'user-connected' event
        socket.broadcast.emit('user-connected', name);
    }); 

    // Receive the message | 'send-chat-message' event
    socket.on('send-chat-message', message => {
        // Send the message to everyone connected | 'chat-message' event
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });  
    });

    // Disconnect Handler | 'disconnect' event
    socket.on('disconnect', () => {
        // Send who disconnect | 'user-disconnected' event
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });
});