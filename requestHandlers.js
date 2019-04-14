// Подключаем модуль с фразами
const { helloMessage, exitMessage, stopWords, goodAnswerWords, badAnswerWords, helpWords, helpMessage, okeyWords, notUnderstandMessage } = require("./phrases");

// Подключаем модуль с вопросами
const questions = require("./questions");

// Подключаем модуль с функцией перемешивания массива
const shuffle = require("./shuffle");

// Подключаем модуль с функцией получения случайного элемента
const getRandomElement = require("./getRandomElement");

// Список сессий и игр. Храним их массив на сервере. 
// Элементы данного массива - объекты с параметры игры(id сессии, счет игры, номер вопроса и сами вопросы)
// Изначально список сессий у нас пустой, но дальше он будет изменяться.
const sessions = [];

const QUESTIONS_COUNT = 10;


/**
 * Функция бработки сообщения, распознанного от Алисы
 * https://tech.yandex.ru/dialogs/alice/doc/protocol-docpage/
 * По этой ссылке доступны форматы запросов и ответов
 * @param {Request} request Запрос от Алисы, содержащий сообщение
 * @param {Response} response Ответ для Алисы, содержит наш ответ
 */
function handleRequest(request, response) {
    // Если пришел запрос на окончание диалоговой сессии, то мы ее завершаем
    // Для этого проверяем, включает ли массив стоп-слов переданное слово.
    if (stopWords.includes(request.body.request.command.toLowerCase())) {
        // Возвращаем ответ в виде объекта, функция json() потом его превратит в формат JSON
        response.json({
            version: request.body.version,
            session: request.body.session,
            response: {
                text: exitMessage,
                end_session: true,
            },
        });

        // Запрос обработан, завершаем функцию
        return;
    }

    // Если сессия новая, то создаем новую игру и выдаем приветственное сообщение.
    if (request.body.session.new) {
        // Создаем новую игру и добавляем ее в массив
        sessions.push({
            sessionId: request.body.session.session_id,
            score: 0,
            questions: shuffle(questions).slice(0, QUESTIONS_COUNT), // Для каждого игрока массив вопросов будет перемешан
            counter: 0,
            state: "NotStarted"
        })
        // Возвращаем ответ в виде объекта, функция json() потом его превратит в формат JSON
        response.json({
            version: request.body.version,
            session: request.body.session,
            response: {
                text: helloMessage,
                end_session: false,
            },
        });

        // Запрос обработан, завершаем функцию
        return;
    }

    // Обработка вопроса "что ты умеешь?"
    if (helpWords.includes(request.body.request.command.toLowerCase())) {
        // Возвращаем ответ в виде объекта, функция json() потом его превратит в формат JSON
        response.json({
            version: request.body.version,
            session: request.body.session,
            response: {
                text: helpMessage,
                end_session: false,
            },
        });

        // Запрос обработан, завершаем функцию
        return;
    }

    // Для всех других сообщений игра уже создана, пытаемся найти ее
    let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

    if (game && game.state === "NotStarted") {
        if (!okeyWords.includes(request.body.request.command.toLowerCase())) {
            response.json({
                version: request.body.version,
                session: request.body.session,
                response: {
                    text: notUnderstandMessage,
                    end_session: false,
                },
            });

            // Запрос обработан, завершаем функцию
            return;
        }
    }

    let message = "";

    // Если игра уже запущена
    if (game && game.state === "Started") {
        if (game.questions[game.counter].correctAnswer === request.body.request.original_utterance) {
            // Если ответ дали верный, то увеличиваем счет.
            game.score++;
            // Выводим случайное радостное сообщение и счет.
            message = getRandomElement(goodAnswerWords) + `Ваш счет ${game.score} из ${game.questions.length}!`;
        }
        else {
            // Выводим случайное досадное сообщение и счет.
            message = getRandomElement(badAnswerWords) + `Ваш счет ${game.score} из ${game.questions.length}!`;
        }
    }

    // Если игра вдруг почему-то не найдена или все вопросы закончились - показываем сообщение о конце игры.
    if (!game || game.counter >= game.questions.length - 1) {
        response.json({
            version: request.body.version,
            session: request.body.session,
            response: {
                // Если с игрой все ок, то выводим также финальный счет
                text: message + (game ? `Ваш финальный счет - ${game.score} из ${game.questions.length}!` : "") + exitMessage,
                end_session: true,
            },
        });
        return;
    }

    // Увеличиваем счетчик вопроса
    if (game.state === "Started" && game.counter < game.questions.length - 1) {
        game.counter++;
    }
    else {
        game.state = "Started";
    }

    // Возвращаем ответ в виде объекта, функция json() потом его превратит в формат JSON
    response.json({
        version: request.body.version,
        session: request.body.session,
        response: {
            text: message + game.questions[game.counter].name, // Выводим сообщение и следующий вопрос
            buttons: shuffle(game.questions[game.counter].possibleAnswers).map(a => ({ title: a })),
            // Выводим возможные ответы в виде кнопок
            end_session: false,
        },
    });
}


// Экспортируем(делаем доступной для всех) только нашу функцию
module.exports = handleRequest;