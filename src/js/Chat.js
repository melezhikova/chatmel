import Requests from './Requests';
import Transform from './Transform';
import Message from './Message';

export default class Chat {
  constructor(obj) {
    this.id = obj.id;
    this.interlocutor = obj.interlocutor;
  }

  addChatToList() {
    const container = document.querySelector('.chatsList');
    const chatBox = document.createElement('div');
    chatBox.classList.add('chatBox');
    chatBox.dataset.id = this.id;
    const chatImage = document.createElement('img');
    chatImage.classList.add('chatImage');
    chatImage.src = `${this.interlocutor.photo}`;
    const itemName = document.createElement('div');
    itemName.classList.add('itemName');
    itemName.textContent = this.interlocutor.name;

    chatBox.append(chatImage);
    chatBox.append(itemName);
    container.append(chatBox);
    chatBox.addEventListener('click', Chat.activateChat);
  }

  static getAllChat() {
    const container = document.querySelector('.chatsList');
    container.innerHTML = '';
    Transform.visibleInput();
    function callback(data) {
      data.forEach((element) => {
        const chat = new Chat(element);
        chat.addChatToList();
      });
      const activeChat = Chat.getActive();
      const id = {
        chatId: activeChat,
        messageId: null,
        method: 'drawchat',
      };
      Requests.byIdGET('chatById', JSON.stringify(id), Message.drawChat);
    }
    Requests.getAll('allChats', callback);
  }

  static getActive() {
    const activeChat = document.querySelector('.activeChat');
    if (!activeChat) {
      try {
        const chats = Array.from(document.querySelectorAll('.chatBox'));
        const active = chats[0];
        if (active) {
          active.classList.add('activeChat');
          return active.dataset.id;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return activeChat;
  }

  static activateChat(event) {
    Chat.deactivateChat();
    event.currentTarget.classList.add('activeChat');
    const chatId = event.currentTarget.dataset.id;
    const id = {
      chatId,
      messageId: null,
      method: 'drawchat',
    };
    Requests.byIdGET('chatById', JSON.stringify(id), Message.drawChat);
  }

  static deactivateChat() {
    const activeChat = document.querySelector('.activeChat');
    if (activeChat) {
      activeChat.classList.remove('activeChat');
    }
  }
}
