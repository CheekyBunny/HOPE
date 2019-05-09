const TONE_MARK = '+';
/**
 * Очищает текст от TTS символов
 * @param {string} textToSay Text that Alice will say
 */
function sanitizeText(textToSay) {
    return textToSay
        .replace(/\+/g, '');
}

module.exports = sanitizeText;