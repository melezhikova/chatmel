import Requests from './Requests';

export default class User {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.photo = obj.photo;
  }

  static register(name) {
    function callback(data) {
      if (data === 'false') {
        const divForMessage = document.querySelector('.registrationMessage');
        divForMessage.textContent = 'Пользователь с таким именем уже существует';
      } else {
        const modal = document.querySelector('.modalBox');
        modal.classList.remove('active');
        const user = new User(JSON.parse(data));
        user.addUserToDOM();
        localStorage.setItem('user', JSON.stringify(user));
      }
    }

    Requests.smthPOST({ name }, 'addInterlocutor', callback);
  }

  static checkUser() {
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
  }

  static removeUserFromDOM() {
    const nameDiv = document.querySelector('.userName');
    nameDiv.textContent = '';
    const photoDiv = document.querySelector('.userPhoto');
    photoDiv.src = '../src/img/user-without-photo.png';
  }

  addUserToDOM() {
    const placeForId = document.querySelector('.mainHeader');
    placeForId.dataset.id = this.id;
    const nameDiv = document.querySelector('.userName');
    nameDiv.textContent = this.name;
    const photoDiv = document.querySelector('.userPhoto');
    photoDiv.src = this.photo;
  }
}
