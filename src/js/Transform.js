export default class Transform {
  static hideInput() {
    const input = document.querySelector('.inputBox');
    input.classList.add('hidden');
    const container = document.querySelector('.messagesContainer');
    container.classList.add('long');
  }

  static visibleInput() {
    const input = document.querySelector('.inputBox');
    input.classList.remove('hidden');
    const container = document.querySelector('.messagesContainer');
    container.classList.remove('long');
  }

  static hidePinned() {
    const pinnedBox = document.querySelector('.pinnedBox');
    if (pinnedBox) {
      const parent = document.querySelector('.chatContainer');
      parent.removeChild(pinnedBox);
      const messagesContainer = document.querySelector('.messagesContainer');
      messagesContainer.classList.remove('withPinned');
    }
  }
}
