// Подключаем модуль с фразами
const { notUnderstandMessage } = require("./phrases");

// Подключаем модуль с обработчиками
const handlers = require("./handlers/handlers");

// Список сессий и игр. Храним их массив на сервере. 
// Элементы данного массива - объекты с параметры игры(id сессии, счет игры, номер вопроса и сами вопросы)
// Изначально список сессий у нас пустой, но дальше он будет изменяться.
const sessions = [];

/**
 * Функция бработки сообщения, распознанного от Алисы
 * https://tech.yandex.ru/dialogs/alice/doc/protocol-docpage/
 * По этой ссылке доступны форматы запросов и ответов
 * @param {Request} request Запрос от Алисы, содержащий сообщение
 * @param {Response} response Ответ для Алисы, содержит наш ответ
 */
function handleRequest(request, response) {
    
    // Идем по списку обработчиков
    for(let handler of handlers) {
        // Если обработчик может обработать запрос
        if(handler.canHandle(request, sessions)) {
            //Он обрабатывает запрос
            handler.handle(request, response, sessions);
            //Завершаем обработку запроса
            return;
        }
    }

    // "Непонятно" если обработчики не смогли обработать запрос
    response.json({
        version: request.body.version,
        session: request.body.session,
        response: {
            text: notUnderstandMessage,
            end_session: false,
        },
    });
}


// Экспортируем(делаем доступной для всех) только нашу функцию
module.exports = handleRequest;