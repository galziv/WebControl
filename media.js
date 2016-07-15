var robotjs = require('robotjs');

var media = {
    'audio_mute': () => {
        robotjs.keyTap('audio_mute');
    },
    'audio_vol_down': () => {
        robotjs.keyTap('audio_vol_down');
    },
    'audio_vol_up': () => {
        robotjs.keyTap('audio_vol_up');
    },
    'audio_stop': () => {
        robotjs.keyTap('audio_stop');
    },
    'audio_pause': () => {
        robotjs.keyTap('audio_pause');
    },
    'audio_play': () => {
        robotjs.keyTap('audio_play');
    },
    'audio_next': () => {
        robotjs.keyTap('audio_next');
    },
    'audio_prev': () => {
        robotjs.keyTap('audio_prev');
    }
}

module.exports = media;