/**
 * Случайным образом упорядочивает элементы массива
 * @param {any[]} originalArray исходный массив
 */
function shuffle(originalArray) {
    // Создаем копию исходного массива
    // для этого мы к пустому массиву конкатенируем исходный
    let array = [].concat(originalArray);

    let currentIndex = array.length, temporaryValue, randomIndex;

    // Пока остаются элементы для перемещения there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Выбираем  индекс случайного  элемента из оставшихся
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Переставляем его с текущим
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// экспортируем только нашу функцию
module.exports = shuffle;

