const Sounds = require("./sounds")

/**
 * Очищает текст от TTS символов
 * @param {string} textToSay Text that Alice will say
 */
function sanitizeText(textToSay, removeDots) {
    removeDots = removeDots || false;

    let sanitizedText = textToSay
        .replace(/\+/g, '')
        .replace(/#/g, '')
        .replace(new RegExp(Sounds.positive, 'g'), '')
        .replace(new RegExp(Sounds.ping, 'g'), '')
        .replace(new RegExp(Sounds.negative, 'g'), '');

    if (removeDots) {
        return sanitizedText.replace(/\./g, '');
    }

    return sanitizedText;
}

module.exports = sanitizeText;