const definitions = require("../definitions");
const sanitizeText = require("../tts/sanitizeText");
const { noSuchDefinitionMessage } = require("../phrases")
const getPartOfPhrase = require("../core/getPartOfPhrase");

const StartMissingWordsHandler = {
    canHandle(request, sessions) {
        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        if (game && game.state === "MissingWordsStarting"){
            return true;
        }

        return false;
    },

    handle(request, response, sessions) {
        let message = "";

        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        let pronouncedDefinition = request.body.request.command.trim().toLowerCase();

        let definition = definitions.find((s)=>s.name.trim().toLowerCase() === pronouncedDefinition);

        if(!definition) {
            // Возвращаем ответ в виде объекта, функция json() потом его превратит в формат JSON
            response.json({
                version: request.body.version,
                session: request.body.session,
                response: {
                    tts: noSuchDefinitionMessage,
                    text: sanitizeText(noSuchDefinitionMessage) + `..... ${JSON.stringify(definitions[0])}`,
                    end_session: false,
                },
            });
            
            return;
        }

        game.state = 'MissingWordsChoosen';

        game.fullPhrase = definition.definition;
        game.missingWords = 0;

        const textToSay = `Вот полное определение: ${game.fullPhrase}. Вы готовы начать игру?`

        response.json({
            version: request.body.version,
            session: request.body.session,
            response: {
                tts: textToSay,
                text: sanitizeText(textToSay), // Выводим сообщение и следующий вопрос
                end_session: false,
            },
        });
    }
}

module.exports = StartMissingWordsHandler;