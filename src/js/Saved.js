import Requests from './Requests';
import Transform from './Transform';

export default class Saved {
  static drawSaved() {
    const nameBox = document.querySelector('.chatsListHeader');
    nameBox.textContent = 'Избранное';
    const chatName = document.querySelector('.chatName');
    chatName.textContent = '';
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
    const { photo } = obj.chat;
    const { name } = obj.chat;
    const chatId = obj.chat.id;

    const messageBox = document.createElement('div');
    messageBox.classList.add('messageBox');
    messageBox.id = obj.message.id;
    messageBox.dataset.chatId = chatId;

    const messageImage = document.createElement('img');
    messageImage.classList.add('messageImage');
    messageImage.src = `${photo}`;

    const messageBody = document.createElement('div');
    messageBody.classList.add('messageBody');

    const messageDetails = document.createElement('div');
    messageDetails.classList.add('messageDetails');
    const messageAuthor = document.createElement('div');
    messageAuthor.classList.add('messageAuthor');
    messageAuthor.textContent = name;
    const messageTime = document.createElement('div');
    messageTime.classList.add('messageTime');
    messageTime.textContent = obj.message.time;
    messageDetails.append(messageAuthor);
    messageDetails.append(messageTime);

    const messageText = document.createElement('div');
    messageText.classList.add('messageText');
    const msg = obj.message.text;
    const linksArr = msg.match(/http[^ ]+/g);
    messageText.innerHTML = msg.replace(linksArr, (url) => `<a class="link" href="${url}">${url}</a>`);

    const desave = document.createElement('div');
    desave.classList.add('desave');
    desave.addEventListener('click', Saved.desave);

    messageBody.append(messageDetails);
    messageBody.append(messageText);
    messageBox.append(messageImage);
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
