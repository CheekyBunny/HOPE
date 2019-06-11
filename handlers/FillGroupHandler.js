const { selectGameMessage } = require("../phrases");
const sanitizeText = require("../tts/sanitizeText");

const FillGroupHandler = {
    canHandle(request, sessions) {
        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        if (game && game.state === "FillGroup"){
            return true;
        }

        return false;
    },

    handle(request, response, sessions) {
        let message = "";

        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        let saidWord = request.body.request.original_utterance;

        game.group = saidWord.trim();

        game.state = "NotStarted";   

        // Возвращаем ответ в виде объекта, функция json() потом его превратит в формат JSON
        response.json({
            version: request.body.version,
            session: request.body.session,
            response: {
                tts: selectGameMessage,
                text: sanitizeText(selectGameMessage),
                end_session: false,
            },
        });
    }
}

module.exports = FillGroupHandler;