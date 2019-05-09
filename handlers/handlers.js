const StopGameHandler = require('./StopGameHandler');
const NewGameHandler = require('./NewGameHandler');
const HelpHandler = require('./HelpHandler');
const QuizHandler = require('./QuizHandler')
const ChooseGameHandler = require('./ChooseGameHandler')

module.exports  = [
    StopGameHandler,
    NewGameHandler,
    ChooseGameHandler,
    HelpHandler,
    QuizHandler,
]