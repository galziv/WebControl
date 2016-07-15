var robotjs = require('robotjs');

var keyboard = {
    keyPress: (key) => {

        console.log(key);

        key = keyMapEnHe[key] || key;
        robotjs.keyTap(key);
    },
    changeLanguageWindows: () => {
        robotjs.keyToggle('alt', 'down');
        robotjs.keyTap('shift');
        robotjs.keyToggle('alt', 'up');
    }
};

var keyMapEnHe = {
    'ש': 'a',
    'נ': 'b',
    'ב': 'c',
    'ג': 'd',
    'ק': 'e',
    'כ': 'f',
    'ע': 'g',
    'י': 'h',
    'ח': 'j',
    'ל': 'k',
    'ך': 'l',
    'צ': 'm',
    'מ': 'n',
    'ם': 'o',
    'פ': 'p',
    'ר': 'r',
    'ד': 's',
    'א': 't',
    'ו': 'u',
    'ה': 'v',
    'ס': 'x',
    'ט': 'y',
    'ז': 'z'
};

module.exports = keyboard;