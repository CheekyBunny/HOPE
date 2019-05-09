const { okeyWords } = require("../phrases");
// Подключаем модуль с функцией перемешивания массива
const shuffle = require("../shuffle");

const ChooseGameHandler = {
    canHandle(request, sessions) {
        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        if (game && game.state === "NotStarted" && okeyWords.includes(request.body.request.command.toLowerCase())){
            return true;
        }

        return false;
    },

    handle(request, response, sessions) {
        let message = "";

        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        if(game.state!=='Quiz') {
            game.state = 'Quiz'
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
}

module.exports = ChooseGameHandler;