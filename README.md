# Проект Mesto бэкенд (в разработке)

## Описание
REST API сервер для проекта react-mesto и react-mesto-auth. Сервер создан с использованием фреймворка express. Для хранения данных используется БД "MongoDB".

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
`/midlleware` — папка с файлами промежуточной обработки  
`/errors` — папка с файлами обработки ошибок

## Системные требования
Node.js v14.18.1  
Express v4.17.2  
Body-parser v1.19.1  
Mongoose v6.1.6  
MongoDB v5.0.5  

## Инструкция по развертыванию
* ### Установить Node.js
* ### Выполнить в корне проекта команду
    * ```bash
        npm i  
      ```
* ### Установить MongoDB, можете скачать ее по [ссылке](https://www.mongodb.com/download-center/community?jmp=docs)
* ### Создать базу данных с названием **express-mesto** и коллекциями **users** и **cards**
    

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

По умолчанию сервер запускается на 3000 порту.

## Планы
В дальнейшем добавится функционал регистрации и авторизации пользователя.

