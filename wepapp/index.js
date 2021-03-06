

var options = {
    showActions: false
};

var lastPoint = { x: null, y: null };
var socket = io.connect('/');
var isKeyboardOpen = false;
var keyboardInput = document.getElementById('keyboard-input');
var x = document.getElementById('x');
var y = document.getElementById('y');

if (!options.showActions) {
    y.style.display = x.style.display = 'none';
}

socket.on('connect', function () {
    console.log('connected');
});

socket.on('disconnect', function () {
    console.log('disconnect');
});

function touchend() {
    lastPoint.x = 0;
    lastPoint.y = 0;
}

function moveMouseDelta(e) {

    e.preventDefault();
    e.stopPropagation();

    try {
        var xDelta = e.changedTouches[0].pageX - lastPoint.x;
        var yDelta = e.changedTouches[0].pageY - lastPoint.y;

        if (lastPoint.x && lastPoint.y) {
            socket.emit('mouseMove', { x: xDelta, y: yDelta });
        }

        window.lastPoint.x = e.changedTouches[0].pageX;
        window.lastPoint.y = e.changedTouches[0].pageY;

        x.innerText = 'x: ' + e.changedTouches[0].pageX;
        y.innerText = 'y: ' + e.changedTouches[0].pageY;
    } catch (ex) {
        x.innerText = ex;
    }
}

function sendMediaKey(e, key) {
    emit(e, 'media', key);
}

function onKeyUp(e) {

    e.preventDefault();
    e.stopPropagation();

    try {

        var letter = keyboardInput.value;
        x.innerText = letter;

        switch (letter) {
            case "\n":
                letter = "enter";
                break;
            case "":
                letter = "backspace";
                break;
            case " ":
                letter = "space";
                break;
        }

        socket.emit('keyPress', letter);

        keyboardInput.value = '';


    } catch (e) {
        alert(e);
    }
}

function keyboardClick(e) {

    e.preventDefault();
    e.stopPropagation();

    if (isKeyboardOpen) {
        document.querySelector('body').focus();
    } else {
        keyboardInput.focus();
    }

    isKeyboardOpen = !isKeyboardOpen;
}

function continuesMediaKey(e, key) {
    window.interval = setInterval(function () {
        socket.emit('media', key);
    }, 70);
}

function stopInterval() {
    clearInterval(window.interval);
}

function changeLanguageWindows(e) {

    e.preventDefault();
    e.stopPropagation();

    socket.emit('changeLanguageWindows');
}

function emit(e, eventName, data) {

    e.preventDefault();
    e.stopPropagation();

    data ? socket.emit(eventName, data) : socket.emit(eventName);
}

function keyPress(e, key) {
    emit(e, 'keyPress', key);
}