/**
 * 
 * @param {string} phrase 
 * @param {Object} options 
 */
function getPartOfPhrase(phrase, options) {
    let wordStartPosition = phrase.indexOf('#', options.startPosition);
    
    let phraseToSay = phrase.substring(0, wordStartPosition);
    let afterPhrase = phrase.substring(wordStartPosition + 1);

    let wordEndPosition = afterPhrase.indexOf('#');
    let missedWord = afterPhrase.substring(0, wordEndPosition);
    
    wordEndPosition += phraseToSay.length;

    let remainingPhrase = phrase.substring(wordEndPosition + 2);
    return {
        missedWord,
        phraseToSay: phraseToSay.trim(),
        remainingPhrase: remainingPhrase.trim(),
        wordStartPosition,
        wordEndPosition
    };
}

module.exports = getPartOfPhrase;