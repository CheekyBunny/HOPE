const StopGameHandler = require('./StopGameHandler');
const NewGameHandler = require('./NewGameHandler');
const HelpHandler = require('./HelpHandler');
const QuizHandler = require('./QuizHandler')
const ChooseGameHandler = require('./ChooseGameHandler')
const StartQuizHandler = require('./StartQuizHandler')
const StartMissingWordsHandler = require('./StartMissingWordsHandler')
const MissingWordsHandler = require('./MissingWordsHandler')

module.exports  = [
    StopGameHandler,
    NewGameHandler,
    ChooseGameHandler,
    HelpHandler,
    StartQuizHandler,
    StartMissingWordsHandler,
    QuizHandler,
    MissingWordsHandler
]