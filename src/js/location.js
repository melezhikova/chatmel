import Modal from './Modal';
import Message from './Message';

export default function location() {
  let coords = null;
  if (navigator.geolocation) {
    const locationCoords = () => new Promise(((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        }, (error) => {
          console.log(error);
          reject(Modal.informModal('К сожалению, что-то пошло не так... Геолокация недоступна'));
        },
      );
    }));

    locationCoords().then((position) => {
      coords = `[${position.coords.latitude}, -${position.coords.longitude}]`;
      const input = document.querySelector('.messageInput');
      input.value = coords;
      Message.sendMessage();
    });
  } else {
    Modal.informModal('К сожалению, геолокация недоступна на Вашем устройстве');
  }
}
