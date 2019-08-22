/* Server */

// Require socket.io
const io = require('socket.io')(3000);

const users = {};

// When a new user reaches the server
io.on('userConnection', socket => {

    // New User Handler | 'new_user' event
    socket.on('new_user', name => {
        users[socket.id] = name;
        // Send to everyone who connected | 'user_connected' event
        socket.broadcast.emit('user_connected', name);
    }); 

    // Receive the message | 'send_chat_message' event
    socket.on('send_message_to_chat', message => {
        // Send the message to everyone connected | 'chat_message' event
        socket.broadcast.emit('chat_message', { message: message, name: users[socket.id] });  
    });

    // Disconnect Handler | 'userDisconnect' event
    socket.on('userDisconnect', () => {
        // Send who disconnect | 'user_disconnected' event
        socket.broadcast.emit('user_disconnected', users[socket.id]);
        delete users[socket.id];
    });
});