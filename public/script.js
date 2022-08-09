// socket connection client side
var socket = io();
socket.emit('entrou')

socket.on('hi', (res) => {
  var item = document.createElement('li');
  item.textContent = res;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
})

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    // socket 'fetch' send message
    socket.emit('send message', input.value);

    input.value = '';
  }
});

// socket 'fetch' get message
socket.on('get message', function(msg) {
var item = document.createElement('li');
item.textContent = msg;
messages.appendChild(item);
window.scrollTo(0, document.body.scrollHeight);
});

socket.on('teste', (res) => {
console.log("depois " + res)
})

// send events example
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });