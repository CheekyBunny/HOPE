// Подключаем модуль Express.js
const express = require('express');

//Загружаем функцию-обработчик события. Так как мы ее сделали доступной с помощью module.exports, она загрузится.
const handleRequest = require("./requestHandlers")

// Определяем порт, на котором он будет работать, либо задаем его по умолчанию. 
// Оператор || вернет 3000 только в том случае, если переменная PORT будет не задана(undefined, null, 0 или false)
const port = process.env.PORT || 3000;

// Создаем сервер с помощью функции express()
const app = express();

// Подключаем поддержку формата JSON, все запросы будут по умолчанию парситься из JSON в объект JS
app.use(express.json());

// Все POST-запросы будут обрабатываться функцией handleRequest
app.post('/', handleRequest);

// Для всех других запросов возващаем ошибку HTTP 404 - Not Found
app.use('*', function (req, res) {
  res.sendStatus(404);
});

// Сервер слушает запросы на указанном порту
app.listen(port);