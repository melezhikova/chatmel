// TODO: write your code here
import User from './User';
import ChatController from './ChatController';

ChatController.init();

const registeredUser = localStorage.getItem('user');
if (!registeredUser) {
  const modal = document.querySelector('.modalBox');
  modal.classList.add('active');
  const nameInput = document.querySelector('.inputName');
  const form = document.querySelector('.formName');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    User.register(nameInput.value);
  });
} else {
  const user = new User(JSON.parse(registeredUser));
  user.addUserToDOM();
}

// const ws = new WebSocket('ws://localhost:7000/ws');

// ws.addEventListener('open', () => {
//   console.log('connected');
//   ws.send('hello');
// });

// ws.addEventListener('message', (evt) => {
//   console.log(evt);
//   if (you) {
//     enteredMessage(evt.data);
//   }
// });

// ws.addEventListener('close', (evt) => {
//   console.log('connection closed', evt);
//   const accounts = ['Alexandra', 'Petr', 'Ivan'];
//   const accountsList = document.querySelector('.accountsList');
//   accountsList.innerHTML = '';
//   accounts.forEach((item) => {
//     drawAccount(item);
//   });
//   const messageForm = document.querySelector('form');
//   messageForm.removeEventListener('submit', inputedMessage);
// });

// ws.addEventListener('error', () => {
//   console.log('error');
// });

// setInterval(() => {
//   try {
//     ws.send('hello');
//   } catch (e) {
//     console.log('err');
//     console.log(e);
//   }
// }, 3000);
