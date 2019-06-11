const StopGameHandler = require('./StopGameHandler');
const NewGameHandler = require('./NewGameHandler');
const HelpHandler = require('./HelpHandler');
const QuizHandler = require('./QuizHandler')
const ChooseGameHandler = require('./ChooseGameHandler')
const StartQuizHandler = require('./StartQuizHandler')
const StartMissingWordsHandler = require('./StartMissingWordsHandler')
const MissingWordsHandler = require('./MissingWordsHandler')
const FillNameHandler = require('./FillNameHandler');
const FillGroupHandler = require('./FillGroupHandler');

module.exports  = [
    StopGameHandler,
    NewGameHandler,
    FillNameHandler,
    FillGroupHandler,
    HelpHandler,
    ChooseGameHandler,
    StartQuizHandler,
    StartMissingWordsHandler,
    QuizHandler,
    MissingWordsHandler
]