// load curse.json file and filter

const fs = require('fs');

class screener {
    static censorMessage(originalMessage) {
        var pureMessage = originalMessage.replaceAll(/[!@#$%^&*()_+ ,./\[\]]/gi, '');
        var processedMessage = pureMessage;
        const curseDB = JSON.parse(fs.readFileSync('./static/curse.json', 'utf8'));

        console.log(pureMessage, processedMessage, originalMessage)

        for (let filteredWord in curseDB) {
            for (let curseWord of curseDB[filteredWord]) {
                processedMessage = processedMessage.replace(new RegExp(curseWord, 'gi'), filteredWord);
            }
        }
        return processedMessage === pureMessage ? originalMessage : processedMessage;
    }
}

module.exports = screener;
