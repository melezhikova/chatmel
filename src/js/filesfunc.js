export default function showFiles(files) {
  const inputMessage = document.querySelector('.messageInput');
  inputMessage.classList.add('msgWithFiles');
  const box = document.querySelector('.sendingFilesBox');
  box.classList.remove('hidden');
  console.log(files);
  files.forEach((file) => {
    if (file.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.classList.add('imgInMessage');
      img.file = file;
      box.appendChild(img);
      const reader = new FileReader();
      reader.onload = (function (elem) {
        return function (e) {
          elem.src = e.target.result;
        };
      }(img));
      reader.readAsDataURL(file);
    }
  });
}
