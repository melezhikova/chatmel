import Chat from './Chat';
import Bot from './Bot';
import showFiles from './filesfunc';
import Message from './Message';
import Saved from './Saved';

export default class ChatController {
  static init() {
    Chat.getAllChat();

    const chatButton = document.querySelector('#chat');
    chatButton.addEventListener('click', Chat.getAllChat);
    const messageForm = document.querySelector('.messageForm');
    messageForm.addEventListener('submit', Message.inputedMessage);

    const input = document.querySelector('.messageInput');
    input.addEventListener('dragover', (evt) => {
      evt.preventDefault();
      input.classList.add('droparea');
      input.placeholder = 'Перетащите файлы сюда';
    });
    window.addEventListener('drop', (evt) => {
      evt.preventDefault();
      input.classList.remove('droparea');
      input.placeholder = 'Введите сообщение';
    });
    input.addEventListener('drop', (evt) => {
      evt.preventDefault();
      const files = Array.from(evt.dataTransfer.files);
      showFiles(files);
      input.classList.remove('droparea');
      input.placeholder = 'Введите сообщение';
      console.log(files);
    });

    const fileInput = document.querySelector('.fileInput');
    fileInput.addEventListener('change', (evt) => {
      const files = Array.from(evt.currentTarget.files);
      showFiles(files);
    });

    const menuItems = Array.from(document.querySelectorAll('.menuItem'));
    menuItems.forEach((item) => {
      item.addEventListener('mouseover', (evt) => {
        evt.currentTarget.classList.add('choosing');
      });
      item.addEventListener('mouseout', (evt) => {
        evt.currentTarget.classList.remove('choosing');
      });
      item.addEventListener('click', (evt) => {
        ChatController.changeActiveMenu(evt);
      });
    });

    const botButton = document.querySelector('#bot');
    botButton.addEventListener('click', Bot.drawBot);

    const savedtButton = document.querySelector('#saved');
    savedtButton.addEventListener('click', Saved.drawSaved);
  }

  static changeActiveMenu(evt) {
    const active = document.querySelector('.menuItemActive');
    active.classList.remove('menuItemActive');
    evt.currentTarget.classList.add('menuItemActive');
  }
}
