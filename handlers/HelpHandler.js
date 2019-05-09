// Подключаем модуль с фразами
const { helpWords, helpMessage } = require("../phrases");
const sanitizeText = require("../tts/sanitizeText");

const HelpHandler = {
    canHandle(request) {
        if (helpWords.includes(request.body.request.command.toLowerCase())) {
            return true;
        }
        return false;
    },

    handle(request, response) {
        response.json({
            version: request.body.version,
            session: request.body.session,
            response: {
                tts: helpMessage,
                text: sanitizeText(helpMessage),
                end_session: false,
            },
        });
    }
}

module.exports = HelpHandler;