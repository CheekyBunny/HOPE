const { exitMessage, stopWords } = require("../phrases");

const StopGameHandler = {
    canHandle(request, sessions) {
        if (stopWords.includes(request.body.request.command.toLowerCase())){
            return true;
        }
        return false;
    },

    handle(request, response, sessions) {
        response.json({
            version: request.body.version,
            session: request.body.session,
            response: {
                text: exitMessage,
                end_session: true,
            },
        });
    }
}

module.exports = StopGameHandler;