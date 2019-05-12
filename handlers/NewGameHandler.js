const { helloMessage } = require("../phrases");
// Подключаем модуль с вопросами
const questions = require("../questions");

const sanitizeText = require("../tts/sanitizeText");

// Подключаем модуль с функцией перемешивания массива
const shuffle = require("../shuffle");

const QUESTIONS_COUNT = 10;

const NewGameHandler = {
    canHandle(request, sessions) {
        if (request.body.session.new) {
            return true;
        }
        return false;
    },

    handle(request, response, sessions) {
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
                text: sanitizeText(helloMessage),
                tts: helloMessage,
                end_session: false,
            },
        });
    }
}

module.exports = NewGameHandler;