const helloMessage = `Привет! Я буду задавать вопросы по агентному моделированию, а вам надо правильно отвечать и набирать очки. 
Для завершения игры скажите "конец игры". Вы готовы начать игру?`;

const exitMessage = `Пока! Надеюсь мы поиграем снова.`

const helpMessage = `Я викторина по агентному моделированию.Я задам вам 10 вопросов по разным темам и лекциям.На каждый вопрос будут предложены варианты ответа.
Если вы дадите правильный ответ,то вы получите 1 балл.Цель игры: набрать как можно больше баллов.`;

const stopWords = [
    "стоп",
    "пока",
    "конец игры",
    "конец",
    "хватит",
    "нет",
    "прекрати"
]

const goodAnswerWords = [
    "Правильно!",
    "Правильный ответ!",
    "Умничка!",
    "Бинго!",
    "Совершенно верно!"
]

const badAnswerWords = [
    "Жаль, но это неверный ответ.",
    "Увы, неверно.",
    "К сожалению, вы неправы",
    "Вот незадача! Это неправильный ответ.",
]

const helpWords = [
    "помощь",
    "что ты умеешь?",
    "справка"
]

const okeyWords = [
    "да",
    "конечно",
    "вперед",
    "погнали",
    "давай поиграем"
]
const notUnderstandMessage = "Извините,я вас не понимаю." + helpMessage;
// экспортируем объект, содержащий все 
module.exports = {
    helloMessage,
    exitMessage,
    helpMessage,
    stopWords,
    goodAnswerWords,
    badAnswerWords,
    helpWords,
    okeyWords,
    notUnderstandMessage
}