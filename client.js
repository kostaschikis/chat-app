/* Client */

// Connect to the server
const socket = io('http://localhost:3000');

// Get Message Container 
const messageContainer = document.getElementById('message-container');
// Get Message-Form from DOM
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

// Ask for Username & Show 'Joined' Message 
let name = prompt('What is your name');
if (name == null || name == '') {
    do { 
        alert('Warning: Your name is null');
        name = prompt('What is your name');
    } while (name == null || name == '')
}
appendMessage('You Joined the Chat, have fun 💯');

// Send the new user name to the server
socket.emit('new-user', name);

// Receive New Message -> data coming from the server
socket.on('chat-message', data => {
    // Append it to DOM
    appendMessageUser(`${data.name}: ${data.message}`);
});

// Receive New User -> data coming from the server
socket.on('user-connected', data => {
    // Append it to DOM
    appendMessageUser(`${data} connected to the chat 💻`);
});

// Receive Disconnected User -> data coming from the server
socket.on('user-disconnected', data => {
    // Append it to DOM
    appendMessage(`${data} disconnected from the chat 👋`);
});

messageForm.addEventListener('submit', () => {
    // Prevent from reloding the page 
    event.preventDefault();
    // Get form imput value
    const message = messageInput.value;
    // Send it to the Server
    socket.emit('send-chat-message', message);
    // Empty the input field
    messageInput.value = '';
    // Show your message in DOM
    appendMessage(`You: ${message}`);
});

// Add the message into DOM
function appendMessage(message) {
    // Create a new div element
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    // Append the new div into the message container
    messageContainer.append(messageElement);
}

function appendMessageUser(message) {
    // Create a new div element
    const messageElement = document.createElement('div');
    messageElement.setAttribute("class", "otherUser");
    messageElement.innerText = message;
    // Append the new div into the message container
    messageContainer.append(messageElement);
}