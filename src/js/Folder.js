import Requests from './Requests';
import Transform from './Transform';

export default class Folder {
  static drawFolder() {
    const filters = [
      { method: 'getAllMedia', name: 'Все вложения' },
      { method: 'getAllImages', name: 'Все изображения' },
      { method: 'getAllVideo', name: 'Все видео' },
      { method: 'getAllAudio', name: 'Все аудио' },
    ];
    const nameBox = document.querySelector('.chatsListHeader');
    nameBox.textContent = 'Медиа';
    const chatName = document.querySelector('.chatName');
    chatName.textContent = '';
    const placeForId = document.querySelector('.chatHeader');
    placeForId.dataset.id = 'Вложения';
    const photo = document.querySelector('.chatInterlocutorPhoto');
    photo.src = '../src/img/folder.png';
    Transform.hideInput();
    Transform.hidePinned();
    const filtersBox = document.querySelector('.chatsList');
    filtersBox.innerHTML = '';
    filters.forEach((item) => {
      const filterButton = document.createElement('button');
      filterButton.classList.add('commandButton');
      filterButton.textContent = item.name;
      filterButton.dataset.method = item.method;
      filterButton.addEventListener('click', Folder.buttonClick);
      filtersBox.append(filterButton);
    });

    function callback(data) {
      const container = document.querySelector('.messagesContainer');
      container.innerHTML = '';
      if (data) {
        data.forEach((item) => {
          Folder.drawMedia(item);
        });
      }
    }

    Requests.getAll('getAllMedia', callback);
  }

  static buttonClick(event) {
    event.preventDefault();
    const { method } = event.currentTarget.dataset;

    function callback(data) {
      const container = document.querySelector('.messagesContainer');
      container.innerHTML = '';
      if (data) {
        data.forEach((item) => {
          Folder.drawMedia(item);
        });
      }
    }

    Requests.getAll(method, callback);
  }

  static drawMedia(file) {
    const container = document.querySelector('.messagesContainer');
    if (file.includes('image/')) {
      const img = document.createElement('img');
      img.classList.add('imgInMessage');
      container.append(img);
      img.src = file;
    }
    if (file.includes('audio/')) {
      const aud = document.createElement('audio');
      aud.setAttribute('controls', 'controls');
      container.append(aud);
      aud.src = file;
    }
    if (file.includes('video/')) {
      const vid = document.createElement('video');
      vid.classList.add('videoInMessage');
      vid.setAttribute('controls', 'controls');
      container.append(vid);
      vid.src = file;
    }
  }
}
