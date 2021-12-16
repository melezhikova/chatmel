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

  addUserToDOM() {
    const placeForId = document.querySelector('.mainHeader');
    placeForId.dataset.id = this.id;
    const nameDiv = document.querySelector('.userName');
    nameDiv.textContent = this.name;
    const photoDiv = document.querySelector('.userPhoto');
    photoDiv.src = this.photo;
  }
}
