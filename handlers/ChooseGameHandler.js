const { missingWordsAnswers, quizAnswers, notUnderstandMessage, startQuizMessage, startMissingWordsMessage } = require("../phrases");
const sanitizeText = require("../tts/sanitizeText");
// Подключаем модуль с функцией перемешивания массива
const shuffle = require("../shuffle");
const definitions = require("../definitions");

const ChooseGameHandler = {
    canHandle(request, sessions) {
        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        if (game && game.state === "NotStarted" || game.state === "ChooseGame"){
            return true;
        }

        return false;
    },

    handle(request, response, sessions) {
        let message = "";

        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        let saidWord = request.body.request.command.toLowerCase()

        if(quizAnswers.includes(sanitizeText(saidWord, true)))
        {
            game.state = 'QuizStarting';

            response.json({
                version: request.body.version,
                session: request.body.session,
                response: {
                    tts: startQuizMessage,
                    text: sanitizeText(startQuizMessage),
                    end_session: false,
                },
            });
        }

        if(missingWordsAnswers.includes(sanitizeText(saidWord, true)))
        {
            game.state = 'MissingWordsStarting';

            response.json({
                version: request.body.version,
                session: request.body.session,
                response: {
                    tts: startMissingWordsMessage,
                    text: sanitizeText(startMissingWordsMessage),
                    buttons: shuffle(definitions).slice(0,5).map(a => ({ title: a.name })),
                    end_session: false,
                },
            });
        }

        // Возвращаем ответ в виде объекта, функция json() потом его превратит в формат JSON
        response.json({
            version: request.body.version,
            session: request.body.session,
            response: {
                tts: notUnderstandMessage,
                text: sanitizeText(notUnderstandMessage),
                end_session: false,
            },
        });
    }
}

module.exports = ChooseGameHandler;