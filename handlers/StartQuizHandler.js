const { okeyWords } = require("../phrases");
const sanitizeText = require("../tts/sanitizeText");
// Подключаем модуль с функцией перемешивания массива
const shuffle = require("../shuffle");

const StartQuizHandler = {
    canHandle(request, sessions) {
        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        if (game && game.state === "QuizStarting" && okeyWords.includes(request.body.request.command.toLowerCase())){
            return true;
        }

        return false;
    },

    handle(request, response, sessions) {
        let message = "";

        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);
        
        game.state = 'Quiz';

        response.json({
            version: request.body.version,
            session: request.body.session,
            response: {
                tts: message + game.questions[game.counter].name,
                text: sanitizeText(message + game.questions[game.counter].name), // Выводим сообщение и следующий вопрос
                buttons: shuffle(game.questions[game.counter].possibleAnswers).map(a => ({ title: a })),
                // Выводим возможные ответы в виде кнопок
                end_session: false,
            },
        });
    }
}

module.exports = StartQuizHandler;