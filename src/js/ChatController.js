import Chat from './Chat';
import Bot from './Bot';
import showFiles from './filesfunc';
import Message from './Message';
import Saved from './Saved';
import Folder from './Folder';
import Modal from './Modal';
import location from './location';

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

    const locationBtn = document.querySelector('.location');
    locationBtn.addEventListener('click', () => {
      function callback(agreement) {
        if (agreement === true) {
          location();
        }
      }

      Modal.agreeModal('Вы хотите отправить свою геолокацию?', callback);
    });

    const messagesContainer = document.querySelector('.messagesContainer');
    messagesContainer.addEventListener('scroll', () => {
      // console.log(`scrollTop: ${messagesContainer.scrollTop}`);
      if (messagesContainer.scrollTop <= 5) {
        const chatId = document.querySelector('.chatHeader').dataset.id;
        if (chatId !== 'Избранное' && chatId !== 'Вложения' && chatId !== 'Бот') {
          Message.getPreviousMessages(chatId);
        }
      }
    });

    const savedtButton = document.querySelector('#saved');
    savedtButton.addEventListener('click', Saved.drawSaved);

    const folderButton = document.querySelector('#folder');
    folderButton.addEventListener('click', Folder.drawFolder);

    const botButton = document.querySelector('#bot');
    botButton.addEventListener('click', Bot.drawBot);
  }

  static changeActiveMenu(evt) {
    const active = document.querySelector('.menuItemActive');
    active.classList.remove('menuItemActive');
    evt.currentTarget.classList.add('menuItemActive');
  }
}
