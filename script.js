const socket = io('http://localhost:3000'),
  messageForm = document.querySelector('#send-container'),
  messageContainer = document.querySelector('#message-container'),
  messageInput = document.querySelector('#message-input');

const name = prompt('What is your name?');
appendMessage('You joind chat');
socket.emit('new-user', name);

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name => {
  appendMessage(`${name} joined chat`);
});

socket.on('user-disconnected', name => {
  appendMessage(`${name} left chat`);
});

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});

function appendMessage(message) {
  const messageElem = document.createElement('div');
  messageElem.innerText = message;
  messageContainer.append(messageElem);
}