/* Client */

// Connect to the server
const socket = io('http://localhost:3000');

// data = 'hello world' | coming from the server
socket.on('chat-message', data => {
    console.log(data);
});