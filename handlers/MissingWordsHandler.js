const { okeyWords } = require("../phrases");
const sanitizeText = require("../tts/sanitizeText");
const getPartOfPhrase = require("../core/getPartOfPhrase");
// Подключаем модуль с функцией перемешивания массива
const Sounds = require("../tts/sounds");
const { goodAnswerWords, badAnswerWords } = require("../phrases");
// Подключаем модуль с функцией получения случайного элемента
const getRandomElement = require("../getRandomElement");

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
        }

        if (game.state === `MissingWords`) {

            let missedWord = sanitizeText(game.missedWord || "");
            let word = sanitizeText(request.body.request.command.toLowerCase());

            if (word === missedWord.toLowerCase().trim()) {
                game.score += 1;
                message = getRandomElement(goodAnswerWords) + `. Ваш счет ${game.score} из ${game.missingWords}! `;
            }
            else {
                message = getRandomElement(badAnswerWords) + `. Правильный ответ - ${missedWord}. Идем дальше. `;
            }
        }

        if (game.state === "MissingWordsChoosen") {
            if (okeyWords.includes(request.body.request.command.toLowerCase())) {
                game.state = "MissingWords"
            }
        }

        game.remainingPhrase = game.remainingPhrase || game.fullPhrase;

        if ((game.remainingPhrase).indexOf('#') < 0) {
            game.state = "ChooseGame";

            const aliceMessage = message + game.remainingPhrase + `. Определение закончилось. Ваш счет - ${game.score} очков. Хотите сыграть снова?`;

            response.json({
                version: request.body.version,
                session: request.body.session,
                response: {
                    text: sanitizeText(aliceMessage),
                    end_session: false,
                },
            });

            return;
        }

        let {
            phraseToSay,
            remainingPhrase,
            missedWord } = getPartOfPhrase(game.remainingPhrase, { startPosition: 0 });

        game.remainingPhrase = remainingPhrase;
        game.missedWord = missedWord;
        game.missingWords++;
        game.phraseToSay = phraseToSay;

        response.json({
            version: request.body.version,
            session: request.body.session,
            response: {
                tts: sanitizeText(message + game.phraseToSay) + Sounds.ping,
                text: message + game.phraseToSay, // Выводим сообщение и следующий вопрос
                end_session: false,
            },
        });
    }
}

module.exports = MissingWordsHandler;