# Мессенджер chatmel

[![Build status](https://ci.appveyor.com/api/projects/status/g5mlxgvhm4dvvgm4?svg=true)](https://ci.appveyor.com/project/melezhikova/chatmel-front)

https://melezhikova.github.io/chatmel_front/

### Реализованы следующие функции:

* Сохранение в истории текстовых сообщений

* Сохранение в истории ссылок (то, что начинается с http:// или https://). Они кликабельны и отображаются как ссылки:

![визуальное отображение ссылки](src/scrins/links.png)

* Добавление в сообщение (и сохранение в истории) изображений, видео и аудио (как файлов) - через Drag & Drop и через иконку загрузки:

![иконка для прикрепления файлов](src/scrins/clip.png)

Выбранные для отправки файлы можно удалить из отправляемого сообщения, нажав на "крестик" в правом верхнем углу файла:

![кнопка для отмены прикрепления файла](src/scrins/cancel.png)

* Возможно скачивание файлов (на компьютер пользователя). Можно воспользоваться появляющимся на медиа-файлах меню:

![меню для загрузки файла](src/scrins/load.png)

* При загрузке сообщений чатов сначала подгружаются последние 10 сообщений, при прокрутке вверх подгружаются следующие 10 и т.д.

* Для отправка геолокации в формате [широта, долгота] необходимо воспользоваться кнопкой, расположенной под полем ввода сообщения:

![кнопка отправки геолокации](src/scrins/location.png)

* Закрепление сообщений. Закреплять можно только одно сообщение. Оно прикрепляется к верхней части страницы:

![закрепленное сообщение](src/scrins/pinned.png)

Чтобы закрепить сообщение, необходимо воспользоваться контекстным меню, стоя на сообщении:

![закрепить сообщение](src/scrins/pinned.png)

Для открепления сообщения нужно воспользоватья контекстным меню

![открепить сообщение](src/scrins/depin.png) 

или "крестиком на закрепленном сообщении

![открепить сообщение](src/scrins/depin2.png) 

При попытке прикрепить второе сообщение выйдет предупреждающее сообщение:

![сообщение о невозможности закрепить сообщение](src/scrins/infopin.png) 

* Можно добавить сообщения в избранное, воспользовавшись контекстным меню:

![сохранить сообщение](src/scrins/infopin.png) 

Для доступа к сохраненным сообщениям используется отдельная вкладка бокового меню.
Для удаления из избранного необходимо воспользоваться контекстным меню

![удалить сообщение из избранного](src/scrins/desave.png)

или кнопкой "крестик" на сообщении, при просмотре его на вкладке избранных

![удалить сообщение из избранного](src/scrins/desave2.png)

* Возможен просмотр вложений по категориям (аудио, видео, изображения). Необходимо выбрать вкладку бокового меню "Файлы".

![скрин визуализации меню файлы](src/scrins/folder.png)

* Реализован интерфейс для отправки команд боту. Для перехода необходимо нажать в боковом меню слева кнопку "Бот". 
Далее, нажимая кнопки в списке команд, получаем ответ от бота

![скрин визуализации бота](src/scrins/pinned.png)

