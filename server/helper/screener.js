// load curse.json file and filter

const fs = require('fs');

class screener {
    static censorMessage(message) {
        const curseDB = JSON.parse(fs.readFileSync('./static/curse.json', 'utf8'));

        for (let filteredWord in curseDB) {
            for (let curseWord of curseDB[filteredWord]) {
                message = message.replace(new RegExp(curseWord, 'gi'), filteredWord);
            }
        }
        return message;
    }
}

module.exports = screener;
