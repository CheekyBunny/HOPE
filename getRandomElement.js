/**
 * Возвращает случайный элемент массива
 * @param {any[]} arr исходный массив
 */
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// экспортируем только нашу функцию
module.exports = getRandomElement;