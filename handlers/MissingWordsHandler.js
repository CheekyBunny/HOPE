const { okeyWords } = require("../phrases");
const sanitizeText = require("../tts/sanitizeText");
const getPartOfPhrase = require("../core/getPartOfPhrase");
const Sounds = require("../tts/sounds");
const { goodAnswerWords, badAnswerWords } = require("../phrases");
// Подключаем модуль с функцией получения случайного элемента
const getRandomElement = require("../getRandomElement");
const generateImage = require("../image/generateImage")
const { similarity, DEFAULT_SIMILARITY } = require('../core/similarity');

const MissingWordsHandler = {
    canHandle(request, sessions) {
        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        if (game && game.state === "MissingWords" || game.state === "MissingWordsChoosen") {
            return true;
        }

        return false;
    },

    async handle(request, response, sessions) {
        let message = "";

        let saidWord = sanitizeText(request.body.request.command.toLowerCase().trim(), true);

        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        if (game.state === "MissingWordsChoosen") {
            if (!okeyWords.includes(saidWord)) {
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
            let word = saidWord;

            if (similarity(word, missedWord.toLowerCase().trim()) > DEFAULT_SIMILARITY) {
                game.score += 1;
                message = Sounds.positive + getRandomElement(goodAnswerWords) + `. Ваш счет ${game.score} из ${game.missingWords}! `;
            }
            else {
                message = Sounds.negative + getRandomElement(badAnswerWords) + `. Правильный ответ - ${missedWord}. Идем дальше. `;
            }
        }

        if (game.state === "MissingWordsChoosen") {
            if (okeyWords.includes(saidWord)) {
                game.state = "MissingWords"
            }
        }

        game.remainingPhrase = game.remainingPhrase || game.fullPhrase;

        if ((game.remainingPhrase).indexOf('#') < 0) {
            game.state = "ChooseGame";

            const aliceMessage = message + game.remainingPhrase + `. Определение закончилось. Ваш счет - ${game.score} очков. Надеюсь мы сыграем снова.`;

            const imageId = await generateImage(game.fio, game.group, game.score, undefined);

            response.json({
                version: request.body.version,
                session: request.body.session,
                response: {
                    card: {
                        type: "BigImage",
                        image_id: imageId,
                        title: "Результат",
                        button:{
                            url: `https://avatars.mds.yandex.net/get-dialogs-skill-card/${imageId}/one-x4`
                        }
                      },
                    tts: aliceMessage,
                    text: sanitizeText(aliceMessage),
                    end_session: true,
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
                text: sanitizeText(message + game.phraseToSay),
                tts: message + game.phraseToSay + Sounds.ping, // Выводим сообщение и следующий вопрос
                end_session: false,
            },
        });
    }
}

module.exports = MissingWordsHandler;