import getTime from './time';
import Requests from './Requests';
import Transform from './Transform';
import Modal from './Modal';

export default class Message {
  constructor(obj) {
    this.id = obj.id;
    this.author = obj.author;
    this.time = obj.time;
    this.msgdata = obj.msgdata;
    this.saved = obj.saved;
    this.pinned = obj.pinned;
  }

  createMessageBox(id) {
    const photo = document.querySelector('.chatInterlocutorPhoto').src;
    const name = document.querySelector('.chatName').textContent;

    const messageBox = document.createElement('div');
    messageBox.classList.add('messageBox');
    messageBox.classList.add(this.author);
    if (!this.id) {
      messageBox.id = id;
    } else {
      messageBox.id = this.id;
    }
    messageBox.dataset.pinned = this.pinned;
    messageBox.dataset.saved = this.saved;

    const messageImage = document.createElement('img');
    const messageAuthor = document.createElement('div');
    if (this.author === 'interlocutor') {
      messageImage.classList.add('messageImage');
      messageImage.src = `${photo}`;
      messageAuthor.classList.add('messageAuthor');
      messageAuthor.textContent = name;
    }
    const messageBody = document.createElement('div');
    messageBody.classList.add('messageBody');

    const messageDetails = document.createElement('div');
    messageDetails.classList.add('messageDetails');
    const messageTime = document.createElement('div');
    messageTime.classList.add('messageTime');
    messageTime.textContent = this.time;
    if (this.author === 'interlocutor') {
      messageDetails.append(messageAuthor);
    }
    messageDetails.append(messageTime);

    const messageText = document.createElement('div');
    messageText.classList.add('messageText');
    const msg = this.msgdata.text;
    if (msg) {
      const linksArr = msg.match(/http[^ ]+/g);
      messageText.innerHTML = msg.replace(linksArr, (url) => `<a class="link" href="${url}">${url}</a>`);
    }
    if (this.msgdata.files) {
      this.msgdata.files.forEach((file) => {
        if (file.includes('image/')) {
          const img = document.createElement('img');
          img.classList.add('imgInMessage');
          img.classList.add('filesInMessage');
          messageText.append(img);
          img.src = file;
        }
        if (file.includes('audio/')) {
          const aud = document.createElement('audio');
          aud.setAttribute('controls', 'controls');
          aud.classList.add('filesInMessage');
          messageText.append(aud);
          aud.src = file;
        }
        if (file.includes('video/')) {
          const vid = document.createElement('video');
          vid.classList.add('videoInMessage');
          vid.classList.add('filesInMessage');
          vid.setAttribute('controls', 'controls');
          messageText.append(vid);
          vid.src = file;
        }
      });
    }

    messageBody.append(messageDetails);
    messageBody.append(messageText);
    if (this.author === 'interlocutor') {
      messageBox.append(messageImage);
    }
    messageBox.append(messageBody);
    messageBox.addEventListener('contextmenu', Message.msgMenu);

    return messageBox;
  }

  static drawChat(data) {
    const placeForId = document.querySelector('.chatHeader');
    placeForId.dataset.id = data.id;
    const photo = document.querySelector('.chatInterlocutorPhoto');
    photo.src = data.interlocutor.photo;
    const chatName = document.querySelector('.chatName');
    chatName.textContent = data.interlocutor.name;
    const { messages } = data;
    const boxForMessages = document.querySelector('.messagesContainer');
    boxForMessages.innerHTML = '';
    messages.forEach((item) => {
      const message = new Message(item);
      boxForMessages.append(message.createMessageBox());
    });
    boxForMessages.lastChild.scrollIntoView(false);
    if (data.pinnedMessage) {
      const pinned = document.querySelector('.pinnedBox');
      if (!pinned) {
        const container = document.querySelector('.chatContainer');
        const pinnedBox = document.createElement('div');
        pinnedBox.classList.add('pinnedBox');
        pinnedBox.dataset.id = data.pinnedMessage.id;
        const body = document.createElement('div');
        body.classList.add('pinnedBody');
        const name = document.createElement('div');
        name.classList.add('pinnedName');
        name.textContent = 'Закрепленное сообщение';
        body.append(name);

        if (data.pinnedMessage.msgdata.text) {
          const pinnedText = document.createElement('div');
          pinnedText.classList.add('pinnedText');
          if (data.pinnedMessage.msgdata.text.length > 20) {
            pinnedText.textContent = `${data.pinnedMessage.msgdata.text.substring(0, 20)}...`;
          } else {
            pinnedText.textContent = data.pinnedMessage.msgdata.text;
          }
          body.append(pinnedText);
        }
        const depin = document.createElement('div');
        depin.classList.add('depin');
        depin.addEventListener('click', Message.depinMessage);

        if (data.pinnedMessage.msgdata.files) {
          data.pinnedMessage.msgdata.files.forEach((file) => {
            if (file.includes('image/')) {
              const img = document.createElement('img');
              img.classList.add('imgInPinnedMessage');
              body.append(img);
              img.src = file;
            }
            if (file.includes('audio/')) {
              const aud = document.createElement('audio');
              aud.classList.add('audioInPinnedMessage');
              aud.setAttribute('controls', 'controls');
              body.append(aud);
              aud.src = file;
            }
            if (file.includes('video/')) {
              const vid = document.createElement('video');
              vid.classList.add('videoInPinnedMessage');
              vid.setAttribute('controls', 'controls');
              body.append(vid);
              vid.src = file;
            }
          });
        }

        body.addEventListener('click', Message.showPinnedMsg);
        pinnedBox.append(body);
        pinnedBox.append(depin);
        const messagesContainer = document.querySelector('.messagesContainer');
        messagesContainer.classList.add('withPinned');
        container.insertBefore(pinnedBox, messagesContainer);
      } else {
        pinned.dataset.id = data.pinnedMessage.id;
        const text = document.querySelector('.pinnedText');
        if (data.pinnedMessage.text.length > 20) {
          text.textContent = `${data.pinnedMessage.text.substring(0, 20)}...`;
        } else {
          text.textContent = data.pinnedMessage.text;
        }
      }
    } else {
      Transform.hidePinned();
    }
  }

  static getPreviousMessages(chatId) {
    const container = document.querySelector('.messagesContainer');
    const messageId = container.firstChild.getAttribute('id');
    const id = {
      chatId,
      messageId,
      method: 'getmoremsg',
    };
    function callback(data) {
      const displayedMsg = [];
      Array.from(document.querySelectorAll('.messageBox')).forEach((item) => displayedMsg.push(item.getAttribute('id')));
      const { messages } = data;
      messages.reverse().forEach((item) => {
        const index = displayedMsg.findIndex((elem) => elem === item.id);
        if (index === -1) {
          const message = new Message(item);
          container.insertBefore(message.createMessageBox(), container.firstChild);
        }
      });
    }
    Requests.byIdGET('chatById', JSON.stringify(id), callback);
  }

  static inputedMessage(event) {
    event.preventDefault();
    Message.sendMessage();
  }

  static enteredMessage(data) {
    console.log(data);
  }

  static sendMessage() {
    const chatId = document.querySelector('.chatHeader').dataset.id;
    const input = document.querySelector('.messageInput');
    const files = Array.from(document.querySelectorAll('.filesForSend'));
    const msgdata = {};
    if (input.value) {
      msgdata.text = input.value;
    }
    if (files.length > 0) {
      msgdata.files = [];
      files.forEach((file) => msgdata.files.push(file.src));
    }
    if (!input.value && files.length === 0) {
      Modal.informModal('Вы пытаетесь отправить пустое сообщение');
    } else {
      const time = getTime();
      const message = new Message({
        author: 'user',
        time,
        msgdata,
        saved: false,
        pinned: false,
      });
      const callback = (id) => {
        const container = document.querySelector('.messagesContainer');
        container.append(message.createMessageBox(id));
        container.lastChild.scrollIntoView(false);
      };
      Requests.smthPOST({ id: chatId, message }, 'addMessage', callback);

      input.value = '';
      document.querySelector('.sendingFilesBox').innerHTML = '';
      document.querySelector('.sendingFilesBox').classList.add('hidden');
      input.classList.remove('msgWithFiles');
    }
  }

  static msgMenu(event) {
    event.preventDefault();
    const box = event.currentTarget;
    const checkMenuInDom = document.querySelector('.contextmenu');
    if (checkMenuInDom) {
      const parent = checkMenuInDom.closest('.messageBox');
      parent.removeChild(checkMenuInDom);
    } else {
      const menu = document.createElement('ul');
      menu.classList.add('contextmenu');

      const menuItems = [
        { id: 'delete', name: 'Удалить сообщение' },
      ];
      if (box.dataset.saved === 'false') {
        menuItems.push({ id: 'savedMsg', name: 'Сохранить в избранное' });
      } else {
        menuItems.push({ id: 'savedMsg', name: 'Удалить из избранного' });
      }
      if (box.dataset.pinned === 'false') {
        menuItems.push({ id: 'pinned', name: 'Закрепить сообщение' });
      } else {
        menuItems.push({ id: 'pinned', name: 'Открепить сообщение' });
      }

      menuItems.forEach((item) => {
        const liEl = document.createElement('li');
        liEl.classList.add('contextmenuItem');
        liEl.id = item.id;
        liEl.textContent = item.name;
        menu.append(liEl);
      });
      box.append(menu);

      let top = menu.offsetTop - menu.offsetHeight + event.offsetY;
      if (top < 0) {
        top = menu.offsetTop + event.offsetY;
      }
      let left;
      if (Array.from(box.classList).includes('user')) {
        left = menu.offsetLeft + event.offsetX - menu.offsetWidth;
      } else {
        left = menu.offsetLeft + event.offsetX;
      }
      menu.style.top = `${top}px`;
      menu.style.left = `${left}px`;

      const deleteBtn = document.querySelector('#delete');
      deleteBtn.addEventListener('click', Message.deleteMessage);
      const savedBtn = document.querySelector('#savedMsg');
      savedBtn.addEventListener('click', Message.savedMessage);
      const pinnedBtn = document.querySelector('#pinned');
      pinnedBtn.addEventListener('click', Message.pinMessage);
    }
  }

  static deleteMessage(event) {
    const idChat = document.querySelector('.chatHeader').dataset.id;
    const idMessage = event.currentTarget.closest('.messageBox').id;
    const options = {
      id: idChat,
      message: { id: idMessage },
    };
    const firstShowedMsg = document.querySelector('.messagesContainer').firstChild.getAttribute('id');
    const id = {
      chatId: idChat,
      messageId: firstShowedMsg,
      method: 'drawchat',
    };
    function callback() {
      Requests.byIdGET('chatById', JSON.stringify(id), Message.drawChat);
    }
    Requests.smthPOST(options, 'deleteMessage', callback);
  }

  static savedMessage(event) {
    const messageBox = event.currentTarget.closest('.messageBox');
    const message = Message.getMessageInfo(messageBox);
    if (message.saved === 'true') {
      Message.deSavedMessage(message);
    } else {
      const idChat = document.querySelector('.chatHeader').dataset.id;
      const photo = document.querySelector('.chatInterlocutorPhoto').src;
      const name = document.querySelector('.chatName').textContent;
      message.saved = 'true';
      const optionsForSave = {
        chat: {
          id: idChat,
          photo,
          name,
        },
        message: {
          id: message.id,
          author: message.author,
          time: message.time,
          msgdata: message.msgdata,
        },
      };
      const optionsForUpdate = {
        id: idChat,
        message,
      };
      const firstShowedMsg = document.querySelector('.messagesContainer').firstChild.getAttribute('id');
      const id = {
        chatId: idChat,
        messageId: firstShowedMsg,
        method: 'drawchat',
      };
      Requests.smthPOST(optionsForSave, 'addSavedMessage', () => {
        Requests.smthPOST(optionsForUpdate, 'updateMessage', () => {
          Requests.byIdGET('chatById', JSON.stringify(id), Message.drawChat);
        });
      });
    }
  }

  static deSavedMessage(message) {
    const idChat = document.querySelector('.chatHeader').dataset.id;
    const optionsForDeSave = {
      id: message.id,
    };
    const optionsForUpdate = {
      id: idChat,
      message: {
        id: message.id,
        author: message.author,
        time: message.time,
        msgdata: message.msgdata,
        saved: 'false',
        pinned: message.pinned,
      },
    };
    const firstShowedMsg = document.querySelector('.messagesContainer').firstChild.getAttribute('id');
    const id = {
      chatId: idChat,
      messageId: firstShowedMsg,
      method: 'drawchat',
    };
    Requests.smthPOST(optionsForDeSave, 'deleteSavedMessage', () => {
      Requests.smthPOST(optionsForUpdate, 'updateMessage', () => {
        Requests.byIdGET('chatById', JSON.stringify(id), Message.drawChat);
      });
    });
  }

  static pinMessage(event) {
    const idChat = document.querySelector('.chatHeader').dataset.id;
    const messageBox = event.currentTarget.closest('.messageBox');
    const message = Message.getMessageInfo(messageBox);
    if (message.pinned === 'true') {
      Message.depinMessage();
    } else {
      const pinnedBox = document.querySelector('.pinnedBox');
      if (pinnedBox) {
        const modal = document.querySelector('.modalInformBox');
        modal.classList.add('active');
        const header = document.querySelector('.modalInfo');
        header.textContent = 'Возможно закрепить только одно сообщение';
        const button = document.getElementById('infoBtn');
        button.addEventListener('click', () => {
          modal.classList.remove('active');
        });
      } else {
        message.pinned = 'true';
        const optionsForPin = {
          id: idChat,
          message: {
            id: message.id,
            msgdata: message.msgdata,
          },
        };
        const optionsForUpdate = {
          id: idChat,
          message,
        };
        const firstShowedMsg = document.querySelector('.messagesContainer').firstChild.getAttribute('id');
        const id = {
          chatId: idChat,
          messageId: firstShowedMsg,
          method: 'drawchat',
        };
        Requests.smthPOST(optionsForPin, 'addPinnedMessage', () => {
          Requests.smthPOST(optionsForUpdate, 'updateMessage', () => {
            Requests.byIdGET('chatById', JSON.stringify(id), Message.drawChat);
          });
        });
      }
    }
  }

  static depinMessage() {
    const pinnedBox = document.querySelector('.pinnedBox');
    if (pinnedBox) {
      const idChat = document.querySelector('.chatHeader').dataset.id;
      const idMsg = pinnedBox.dataset.id;
      const parent = document.querySelector('.chatContainer');
      parent.removeChild(pinnedBox);
      const messagesContainer = document.querySelector('.messagesContainer');
      messagesContainer.classList.remove('withPinned');
      const pinnedMessageDiv = document.getElementById(idMsg);
      const message = Message.getMessageInfo(pinnedMessageDiv);
      message.pinned = 'false';

      const optionsForDePin = {
        id: idChat,
      };
      const optionsForUpdate = {
        id: idChat,
        message,
      };
      const firstShowedMsg = document.querySelector('.messagesContainer').firstChild.getAttribute('id');
      const id = {
        chatId: idChat,
        messageId: firstShowedMsg,
        method: 'drawchat',
      };
      Requests.smthPOST(optionsForDePin, 'deletePinnedMessage', () => {
        Requests.smthPOST(optionsForUpdate, 'updateMessage', () => {
          Requests.byIdGET('chatById', JSON.stringify(id), Message.drawChat);
        });
      });
    }
  }

  static showPinnedMsg() {
    const pinnedBox = document.querySelector('.pinnedBox');
    const idMsg = pinnedBox.dataset.id;
    const pinnedMessageDiv = document.getElementById(idMsg);
    pinnedMessageDiv.scrollIntoView(false);
  }

  static getMessageInfo(div) {
    const { id } = div;
    const { saved } = div.dataset;
    const { pinned } = div.dataset;
    const msgdata = {};
    const files = Array.from(div.querySelectorAll('.filesInMessage'));

    if (files.length > 0) {
      msgdata.files = [];
      files.forEach((el) => msgdata.files.push(el.getAttribute('src')));
    }
    const text = div.querySelector('.messageText').textContent;
    if (text) {
      msgdata.text = text;
    }
    const time = div.querySelector('.messageTime').textContent;
    let author;
    if (Array.from(div.classList).includes('user')) {
      author = 'user';
    } else {
      author = 'interlocutor';
    }

    return {
      id,
      author,
      time,
      msgdata,
      saved,
      pinned,
    };
  }
}
