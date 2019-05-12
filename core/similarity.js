/**
 * Значение похожести по умолчанию (80%)
 */
const DEFAULT_SIMILARITY = 0.8;

/**
 * Рассчитывает редакционное расстояние между двумя строками (расстояние Левенштейна)
 * @param {string} s1 Первая строка
 * @param {string} s2 Вторая строка
 * @returns{number}
 */
function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    let costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

/**
 * Рассчитывает степень похожести двух строка от 0 до единицы
 * @param {string} s1 Первая строка
 * @param {string} s2 Вторая строка
 * @returns{number} 
 */
function similarity(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    let longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / Number(longerLength);
}

module.exports = {
    DEFAULT_SIMILARITY,
    similarity
}