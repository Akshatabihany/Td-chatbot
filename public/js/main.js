const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
//const t=
//get user and room from url without ampersand and other signs
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();


socket.emit('joinRoom', { username, room });

socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});


socket.on('message', message => {
  console.log(message);
  outputMessage(message);

 
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
socket.on('oldmsg',function(docs){
  for(var i=0;i<docs.length;i++)
  {
    displaymsg(docs[i])
  }
})

function displaymsg(data){
  $chat.append(data.msg)
}

chatForm.addEventListener('submit', e => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;
  
  
  socket.emit('chatMessage', msg);

  
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});


function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

function outputRoomName(room) {
  roomName.innerText = room;
}


function outputUsers(users) {
  userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `;
}

function geturl()
{
var x=location.search
const usp = new URLSearchParams(x)
const t=usp.toString()
console.log(usp.toString())
const name=usp.get('username')
console.log(name)
return {t};
}
function getname()
{
var x=location.search
const usp = new URLSearchParams(x)
const t=usp.toString()
console.log(usp.toString())
const name=usp.get('username')
console.log(name)
return {name};
}
module.exports = {
  getname,geturl
};

