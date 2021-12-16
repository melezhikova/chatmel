export default class Requests {
  static getAll(link, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://chatmel.herokuapp.com/?method=${link}`);

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = Array.from(JSON.parse(xhr.responseText));
          console.log(data);
          callback(data);
        } catch (e) {
          console.error(e);
        }
      }
    });

    xhr.send();
  }

  static byIdGET(link, id, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://chatmel.herokuapp.com/?method=${link}&id=${id}`);
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          console.log(data);
          callback(data);
        } catch (e) {
          console.error(e);
        }
      }
    });
    xhr.send();
  }

  static smthPOST(options, method, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://chatmel.herokuapp.com/');
    const request = JSON.stringify({ method, object: options });
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = xhr.responseText;
          console.log(data);
          callback(data);
        } catch (e) {
          console.error(e);
        }
      }
    });
    xhr.send(request);
  }
}
