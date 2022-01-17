// TODO: write your code here
import User from './User';
import ChatController from './ChatController';
import Message from './Message';

const ws = new WebSocket('ws://localhost:7000/ws');

ws.addEventListener('open', () => {
  console.log('connected');
  ws.send('hello');
});

ws.addEventListener('message', (evt) => {
  console.log(evt);
  if (localStorage.getItem('user')) {
    Message.enteredMessage(evt.data);
  }
});

ws.addEventListener('close', (evt) => {
  console.log('connection closed', evt);
});

ws.addEventListener('error', () => {
  console.log('error');
});

setInterval(() => {
  try {
    ws.send('hello');
  } catch (e) {
    console.log('err');
    console.log(e);
  }
}, 10000);

ChatController.init();
User.checkUser();

const exit = document.querySelector('.exit');
exit.addEventListener('click', () => {
  localStorage.removeItem('user');
  User.removeUserFromDOM();
  User.checkUser();
});
