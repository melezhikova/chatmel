import Requests from './Requests';
import Transform from './Transform';

export default class Saved {
  static drawSaved() {
    const nameBox = document.querySelector('.chatsListHeader');
    nameBox.textContent = 'Избранное';
    const chatName = document.querySelector('.chatName');
    chatName.textContent = '';
    const placeForId = document.querySelector('.chatHeader');
    placeForId.dataset.id = 'Избранное';
    const photo = document.querySelector('.chatInterlocutorPhoto');
    photo.src = '../src/img/saved.png';
    Transform.hideInput();
    Transform.hidePinned();
    const list = document.querySelector('.chatsList');
    list.innerHTML = '';
    const container = document.querySelector('.messagesContainer');
    container.innerHTML = '';

    function callback(data) {
      data.forEach((element) => {
        Saved.addSavedMessageToDOM(element);
      });
    }

    Requests.getAll('getAllSaved', callback);
  }

  static addSavedMessageToDOM(obj) {
    const box = document.querySelector('.messagesContainer');
    const { name } = obj.chat;
    const chatId = obj.chat.id;
    const { author } = obj.message;

    const messageBox = document.createElement('div');
    messageBox.classList.add('messageBox');
    messageBox.id = obj.message.id;
    messageBox.dataset.chatId = chatId;

    const messageBody = document.createElement('div');
    messageBody.classList.add('messageBody');

    const messageDetails = document.createElement('div');
    messageDetails.classList.add('messageDetails');
    const chat = document.createElement('div');
    chat.classList.add('chat');
    chat.textContent = `Чат с ${name}`;
    const messageAuthor = document.createElement('div');
    messageAuthor.classList.add('messageAuthor');
    if (author === 'interlocutor') {
      messageAuthor.textContent = `Автор: ${name}`;
    } else {
      messageAuthor.textContent = 'Автор: Вы';
    }
    const messageTime = document.createElement('div');
    messageTime.classList.add('messageTime');
    messageTime.textContent = obj.message.time;
    messageDetails.append(chat);
    messageDetails.append(messageAuthor);
    messageDetails.append(messageTime);
    messageBody.append(messageDetails);

    const desave = document.createElement('div');
    desave.classList.add('desave');
    desave.addEventListener('click', Saved.desave);

    if (obj.message.msgdata.text) {
      const messageText = document.createElement('div');
      messageText.classList.add('messageText');
      const msg = obj.message.msgdata.text;
      const linksArr = msg.match(/http[^ ]+/g);
      messageText.innerHTML = msg.replace(linksArr, (url) => `<a class="link" href="${url}">${url}</a>`);
      messageBody.append(messageText);
    }

    if (obj.message.msgdata.files) {
      obj.message.msgdata.files.forEach((file) => {
        if (file.includes('image/')) {
          const img = document.createElement('img');
          img.classList.add('imgInMessage');
          messageBody.append(img);
          img.src = file;
        }
        if (file.includes('audio/')) {
          const aud = document.createElement('audio');
          aud.setAttribute('controls', 'controls');
          messageBody.append(aud);
          aud.src = file;
        }
        if (file.includes('video/')) {
          const vid = document.createElement('video');
          vid.classList.add('videoInMessage');
          vid.setAttribute('controls', 'controls');
          messageBody.append(vid);
          vid.src = file;
        }
      });
    }

    messageBox.append(messageBody);
    messageBox.append(desave);
    box.append(messageBox);
    messageBox.scrollIntoView(false);
  }

  static desave(event) {
    const messageDiv = event.currentTarget.closest('.messageBox');
    const msgId = messageDiv.id;
    const { chatId } = messageDiv.dataset;
    const options = {
      id: chatId,
      message: {
        id: msgId,
      },
    };
    Requests.smthPOST({ id: msgId }, 'deleteSavedMessage', () => {
      Requests.smthPOST(options, 'updatePropertySaved', Saved.drawSaved);
    });
  }
}
