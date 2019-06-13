const { exitMessage, stopWords } = require("../phrases");

const sanitizeText = require("../tts/sanitizeText");

const StopGameHandler = {
    canHandle(request, sessions) {
        let saidWord = sanitizeText(request.body.request.command.toLowerCase(), true);

        if (stopWords.includes(saidWord)) {
            return true;
        }
        return false;
    },

    handle(request, response, sessions) {
        response.json({
            version: request.body.version,
            session: request.body.session,
            response: {
                tts: exitMessage,
                text: sanitizeText(exitMessage),
                end_session: true,
            },
        });
    }
}

module.exports = StopGameHandler;