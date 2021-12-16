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

