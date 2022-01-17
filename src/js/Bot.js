import Requests from './Requests';
import Transform from './Transform';

export default class Bot {
  static drawBot() {
    const commands = [
      { id: 'weather', name: 'Про погоду?' },
      { id: 'quote', name: 'Цитата дня' },
      { id: 'horoscope', name: 'Гороскоп на сегодня' },
      { id: 'news', name: 'Последние новости' },
      { id: 'exchangeRates', name: 'Текущие курсы на бирже' },
    ];
    const nameBox = document.querySelector('.chatsListHeader');
    nameBox.textContent = 'Бот';
    const chatName = document.querySelector('.chatName');
    chatName.textContent = '';
    const placeForId = document.querySelector('.chatHeader');
    placeForId.dataset.id = 'Бот';
    const photo = document.querySelector('.chatInterlocutorPhoto');
    photo.src = '../src/img/bot.png';
    Transform.hideInput();
    Transform.hidePinned();
    const commandsBox = document.querySelector('.chatsList');
    commandsBox.innerHTML = '';
    commands.forEach((item) => {
      const commandButton = document.createElement('button');
      commandButton.classList.add('commandButton');
      commandButton.textContent = item.name;
      commandButton.dataset.id = item.id;
      commandButton.addEventListener('click', Bot.buttonClick);
      commandsBox.append(commandButton);
    });

    function callback(data) {
      const container = document.querySelector('.messagesContainer');
      container.innerHTML = '';
      if (data) {
        data.forEach((item) => {
          Bot.drawBotMessages(item);
        });
      }
    }
    Requests.getAll('getBotMessages', callback);
  }

  static buttonClick(event) {
    event.preventDefault();
    const { id } = event.currentTarget.dataset;
    const message = {
      author: 'user',
      text: event.currentTarget.textContent,
    };

    function callback() {
      Bot.drawBotMessages(message);
      Requests.byIdGET('botmel', id, (data) => Bot.drawBotMessages(data));
    }

    Requests.smthPOST(message, 'addBotMessage', callback);
  }

  static drawBotMessages(message) {
    const container = document.querySelector('.messagesContainer');
    const messageBox = document.createElement('div');
    messageBox.classList.add('messageBox');
    messageBox.classList.add(message.author);
    const messageBody = document.createElement('div');
    messageBody.classList.add('messageBody');
    const messageText = document.createElement('div');
    messageText.classList.add('messageText');
    messageText.textContent = message.text;

    messageBody.append(messageText);
    messageBox.append(messageBody);
    container.append(messageBox);
    messageBox.scrollIntoView(false);
  }
}
