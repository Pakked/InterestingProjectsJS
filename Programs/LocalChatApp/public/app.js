const socket = io();
const messageInput = document.getElementById('message-input');
const messages = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');

chatForm.addEventListener('submit', e => {
    e.preventDefault();
    socket.emit('chat message', messageInput.value);
    messageInput.value = '';
});

socket.on('chat message', message => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerText = message;
    messages.appendChild(messageElement);
});
