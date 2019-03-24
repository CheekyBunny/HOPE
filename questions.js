const questions = [
    {
        chapter:1,
        lection:1,
        name: "Какоим свойством не обладает интеллекутальный агент?",
        possibleAnswers: [
            "Автономность",
            "Реактивность",
            "Проактивность",
            "Детерминированность"
        ],
        correctAnswer: "Детерминированность"
    },
    {
        chapter:1,
        lection:1,
        name: "Назовие свойство агента - конкретное множество конечных и промежуточных состояний, достижение которые агент принял в качестве текущей стратегии поведения;",
        possibleAnswers: [
            "Цели",
            "Знания",
            "Убеждения",
            "Намерения"
        ],
        correctAnswer: "Цели"
    },
    {
        chapter:1,
        lection:1,
        name: "Какие агенты характеризуются физическим и социальным состояниями, имеют простое поведение в виде реакций на текущие изменения среды и информацию от других агентов по продукционным правилам \"условие — действие\"",
        possibleAnswers: [
            "Рефлексивные",
            "Целенаправленные",
            "Самообучающиеся",
            "Эмоциональные"
        ],
        correctAnswer: "Рефлексивные"
    },
    {
        chapter:1,
        lection:1,
        name: "Назовите термин - степень полноты и глубины априорной базы знаний, стратегий и алгоритмов целеустремленного поведения в условиях неопределенности, риска и конфликта.",
        possibleAnswers: [
            "Критерий интеллектуальности",
            "Критерий поведения",
            "Критерий действия",
            "Критерий моделирования"
        ],
        correctAnswer: "Критерий интеллектуальности"
    },
    {
        chapter:1,
        lection:1,
        name: "Какой компонент учитывает физическое состояние и характеристики агента, изменяющиеся в текущей ситуации в зависимости от внутренних связей и внешней информации",
        possibleAnswers: [
            "Сенсор",
            "Физик",
            "Статус",
            "Поведение"
        ],
        correctAnswer: "Физик"
    },
    {
        chapter:1,
        lection:2,
        name: "Кто создатель игры Жизнь ?",
        possibleAnswers: [
            "Джон Конвей",
            "Мартин Гарднер",
            "Джон фон Нейман",
            "Ада Лавлейс"
        ],
        correctAnswer: "Джон Конвей"
    },
    {
        chapter:1,
        lection:2,
        name: "Какая из ситуаций приводит к завершению игры ?",
        possibleAnswers: [
            "Если на поле не останется ни одной «живой» клетки",
            "Если при очередном шаге ни одна из клеток не меняет своего состояния",
            "Если конфигурация на очередном шаге в точности повторит себя же на одном из более ранних шагов",
            "Все варианты ответов верны"
        ],
        correctAnswer: "Все варианты ответов верны"
    },
    {
        chapter:1,
        lection:2,
        name: "Сколько массивов используется для реализации простейшго алгоритма «смены поколения»  ?",
        possibleAnswers: [
            "1",
            "2",
            "3",
            "4"
        ],
        correctAnswer: "2"
    },
    {
        chapter:1,
        lection:2,
        name: "От чего зависит привлекательность поля в модифицированной игре Жизнь ?",
        possibleAnswers: [
            "От положения клетки",
            "От генома соседних клеток",
            "От генома текущей клетки"
        ],
        correctAnswer: "От генома текущей клетки"
    },
    // {
    //     chapter:1,
    //     lection:3,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:1,
    //     lection:3,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:1,
    //     lection:3,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:1,
    //     lection:3,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:1,
    //     lection:4,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:1,
    //     lection:4,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:1,
    //     lection:4,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:1,
    //     lection:4,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:2,
    //     lection:1,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:2,
    //     lection:1,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:2,
    //     lection:1,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:2,
    //     lection:1,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:2,
    //     lection:2,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:2,
    //     lection:2,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:2,
    //     lection:2,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:2,
    //     lection:2,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:2,
    //     lection:3,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:2,
    //     lection:3,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:2,
    //     lection:3,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:2,
    //     lection:3,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:2,
    //     lection:4,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:2,
    //     lection:4,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:2,
    //     lection:4,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },
    // {
    //     chapter:2,
    //     lection:4,
    //     name: " ?",
    //     possibleAnswers: [
    //         "",
    //         "",
    //         "",
    //         ""
    //     ],
    //     correctAnswer: ""
    // },


]

module.exports = questions;