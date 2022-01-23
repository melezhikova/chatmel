import Modal from './Modal';

function deleteMedia(event) {
  const box = document.querySelector('.sendingFilesBox');
  const mediaToDelete = event.currentTarget.closest('.mediaContainer');
  box.removeChild(mediaToDelete);

  function stop(int) {
    clearInterval(int);
  }
  const interval = setInterval(() => {
    const files = document.querySelectorAll('.filesForSend');
    if (files.length === 0) {
      box.classList.add('hidden');
      document.querySelector('.messageInput').classList.remove('msgWithFiles');
    }
    if (box.className.includes('hidden')) {
      stop(interval);
    }
  }, 1000);
}

export default function showFiles(files) {
  const inputMessage = document.querySelector('.messageInput');
  inputMessage.classList.add('msgWithFiles');
  const box = document.querySelector('.sendingFilesBox');
  box.classList.remove('hidden');

  files.forEach((file) => {
    if (file.size > 800000) {
      Modal.informModal('Вы можете загрузить файл размером не более 780 Кбит');
      const files = document.querySelectorAll('.filesForSend');
      if (files.length === 0) {
        box.classList.add('hidden');
        document.querySelector('.messageInput').classList.remove('msgWithFiles');
      }
    } else {
      const mediaContainer = document.createElement('div');
      mediaContainer.classList.add('mediaContainer');
      const btn = document.createElement('button');
      btn.classList.add('mediaCancel');
      btn.type = 'button';
      btn.addEventListener('click', deleteMedia);
      mediaContainer.append(btn);
      console.log(file);
      console.log(file.size);
      if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.classList.add('imgInMessage');
        img.classList.add('filesForSend');
        img.file = file;
        mediaContainer.append(img);
        const reader = new FileReader();
        reader.onload = ((elem) => (e) => {
          elem.src = e.target.result;
        })(img);
        reader.readAsDataURL(file);
      }
      if (file.type.startsWith('audio/')) {
        const aud = document.createElement('audio');
        aud.setAttribute('controls', 'controls');
        aud.classList.add('audioInMessage');
        aud.classList.add('filesForSend');
        mediaContainer.append(aud);
        const reader = new FileReader();
        reader.onload = ((elem) => (e) => {
          elem.src = e.target.result;
        })(aud);
        reader.readAsDataURL(file);
      }
      if (file.type.startsWith('video/')) {
        const vid = document.createElement('video');
        vid.setAttribute('controls', 'controls');
        vid.classList.add('videoInMessage');
        vid.classList.add('filesForSend');
        mediaContainer.append(vid);
        const reader = new FileReader();
        reader.onload = ((elem) => (e) => {
          elem.src = e.target.result;
        })(vid);
        reader.readAsDataURL(file);
      }
      box.append(mediaContainer);
    }
  });
}
