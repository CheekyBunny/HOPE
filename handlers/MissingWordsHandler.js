const { okeyWords } = require("../phrases");
const sanitizeText = require("../tts/sanitizeText");
const getPartOfPhrase = require("../core/getPartOfPhrase");
// Подключаем модуль с функцией перемешивания массива
const  Sounds = require("../tts/sounds");

const MissingWordsHandler = {
    canHandle(request, sessions) {
        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        if (game && game.state === "MissingWords" || game.state === "MissingWordsChoosen") {
            return true;
        }

        return false;
    },

    handle(request, response, sessions) {
        let message = "";

        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        if (game.state === "MissingWordsChoosen") {
            if (!okeyWords.includes(request.body.request.command.toLowerCase())) {
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

                return;
            }
            else {
                game.state = "MissingWords"
            }
        }
        
        game.remainingPhrase = game.remainingPhrase || game.fullPhrase;

        let {
            phraseToSay,
            remainingPhrase,
            missedWord } = getPartOfPhrase(game.remainingPhrase, { startPosition: 0 });

        game.remainingPhrase = remainingPhrase;
        game.missedWord = missedWord;
        game.phraseToSay = phraseToSay;

        response.json({
            version: request.body.version,
            session: request.body.session,
            response: {
                tts: game.phraseToSay +  Sounds.ping,
                text: game.phraseToSay, // Выводим сообщение и следующий вопрос
                end_session: false,
            },
        });
    }
}

module.exports = MissingWordsHandler;