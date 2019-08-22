/* Client */

// Connect to the server
const socket = io('http://localhost:3000');

// Get Message Container 
const messageContainer = document.getElementById('message-container');
// Get Message-Form from DOM
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

/*_____________Whats Your Name Prompt_____________*/

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
socket.emit('new_user', name);
/*___________________________________________________*/


/*_____________Data From Server Handling_____________*/

// Receive New Message -> data coming from the server 
socket.on('chat_message', data => {
    // Append it to DOM
    appendMessageUser(`${data.name}: ${data.message}`);
});

// Receive New User -> data coming from the server
socket.on('user_connected', data => {
    // Append it to DOM
    appendMessageUser(`${data} connected to the chat 💻`);
});

// Receive Disconnected User -> data coming from the server
socket.on('user_disconnected', data => {
    // Append it to DOM
    appendMessage(`${data} disconnected from the chat 👋`);
});
/*___________________________________________________*/


/*_____________Data From Client Handling_____________*/
messageForm.addEventListener('submit', () => {
    // Prevent from reloding the page 
    event.preventDefault();
    // Get form imput value
    const message = messageInput.value;
    // Send it to the Server
    socket.emit('send_message_to_chat', message);
    // Empty the input field
    messageInput.value = '';
    // Show your message in DOM
    appendMessage(`You: ${message}`);
});
/*___________________________________________________*/


/*_________JS Functions for DOM Manipulation_________*/

// Add the message into DOM
function appendMessage(message) {
    // Create a new div element
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    // Append the new div into the message container
    messageContainer.append(messageElement);
}

// Add the other user's message to DOM 
function appendMessageUser(message) {
    // Create a new div element
    const messageElement = document.createElement('div');
    messageElement.setAttribute("class", "otherUser");
    messageElement.innerText = message;
    // Append the new div into the message container
    messageContainer.append(messageElement);
}
/*___________________________________________________*/