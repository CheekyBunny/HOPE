const { selectGroupMessage } = require("../phrases");
const sanitizeText = require("../tts/sanitizeText");

const FillNameHandler = {
    canHandle(request, sessions) {
        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        if (game && game.state === "FillName"){
            return true;
        }

        return false;
    },

    handle(request, response, sessions) {
        let message = "";

        let game = sessions.find((s) => s.sessionId === request.body.session.session_id);

        let saidWord = request.body.request.original_utterance

        game.fio = saidWord.trim();

        game.state = "FillGroup";   

        // Возвращаем ответ в виде объекта, функция json() потом его превратит в формат JSON
        response.json({
            version: request.body.version,
            session: request.body.session,
            response: {
                tts: selectGroupMessage,
                text: sanitizeText(selectGroupMessage),
                end_session: false,
            },
        });
    }
}

module.exports = FillNameHandler;