const { exitMessage, goodAnswerWords, badAnswerWords } = require("../phrases");
// Подключаем модуль с функцией перемешивания массива
const shuffle = require("../shuffle");
// Подключаем модуль с функцией получения случайного элемента
const getRandomElement = require("../getRandomElement");
const Sounds = require("../tts/sounds");
const sanitizeText = require("../tts/sanitizeText");
const { similarity, DEFAULT_SIMILARITY } = require('../core/similarity');
const generateImage = require("../image/generateImage")

const QuizHandler = {
    canHandle(request, sessions) {
        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        if (game && game.state === "Quiz") {
            return true;
        }
        return false;
    },

    async handle(request, response, sessions) {
        let message = "";

        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        if (similarity(
            game.questions[game.counter].correctAnswer.trim().toLowerCase(), 
            sanitizeText(request.body.request.original_utterance.trim().toLowerCase())
            ) > DEFAULT_SIMILARITY
        ) {
            // Если ответ дали верный, то увеличиваем счет.
            game.score++;
            // Выводим случайное радостное сообщение и счет.
            message = Sounds.positive + getRandomElement(goodAnswerWords) + ` Ваш счет ${game.score} из ${game.questions.length}!`;
        }
        else {
            // Выводим случайное досадное сообщение и счет.
            message = Sounds.negative + getRandomElement(badAnswerWords) + ` Ваш счет ${game.score} из ${game.questions.length}!`;
        }

        // Если все вопросы закончились - показываем сообщение о конце игры.
        if (game.counter >= game.questions.length - 1) {
            let finalMessage = message + (game ? ` Ваш фин+альный счет - ${game.score} из ${game.questions.length}! ` : " ") + exitMessage;

            const imageId = await generateImage(game.fio, game.group, game.score, game.questions.length);

            response.json({
                version: request.body.version,
                session: request.body.session,
                response: {
                    card: {
                        type: "BigImage",
                        image_id: imageId,
                        title: "Результат",
                        description: sanitizeText(finalMessage),
                        button:{
                            url: `https://avatars.mds.yandex.net/get-dialogs-skill-card/${imageId}/one-x4`
                        }
                      },
                    tts: finalMessage,
                    text: sanitizeText(finalMessage),
                    end_session: true,
                },
            });
            return;
        }

        // Увеличиваем счетчик вопроса
        if (game.counter < game.questions.length - 1) {
            game.counter++;
        }

        // Возвращаем ответ в виде объекта, функция json() потом его превратит в формат JSON
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

module.exports = QuizHandler;