# Проект Mesto бэкенд

## Функционал
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
* ### Установить в корень проекта модули коммандами
    * ```bash
        npm install express
        npm install nodemon -D
        npm i mongoose 
        npm i body-parser
      ```
* ### Установить MongoDB, можете скачать ее по ![ссылке](https://www.mongodb.com/download-center/community?jmp=docs)
* ### Создать базу данных с названием express-mesto
    

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

По умолчанию сервер запускается на 3000 порту


