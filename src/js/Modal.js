export default class Modal {
  static informModal(message) {
    const modal = document.querySelector('.modalInformBox');
    modal.classList.add('active');
    const header = document.querySelector('.modalInfo');
    header.textContent = message;
    const button = document.getElementById('infoBtn');
    button.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  static agreeModal(message, callback) {
    const modal = document.querySelector('.modalAgreeBox');
    modal.classList.add('active');
    const header = modal.querySelector('.modalInfo');
    header.textContent = message;
    const yesButton = document.getElementById('yesBtn');
    const noButton = document.getElementById('noBtn');

    yesButton.onclick = () => {
      Modal.closeModal();
      callback(true);
    };
    noButton.onclick = () => {
      Modal.closeModal();
      callback(false);
    };
  }

  static closeModal() {
    const modal = document.querySelector('.modalAgreeBox');
    modal.classList.remove('active');
    const header = modal.querySelector('.modalInfo');
    header.textContent = '';
  }
}
