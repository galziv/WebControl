const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const spawn = require('child_process').spawn;
const fs = require('fs');

const configuration = JSON.parse(fs.readFileSync('configuration.json', 'utf8'));

/* Configuration */
const port = configuration.port;
const browserPath = configuration.browserPath;

const mouse = require('./mouse');
const media = require('./media');
const keyboard = require('./keyboard');

const rootPath = 'wepapp/';
const imgPath = 'img/';


const stripFileName = (path, fileDirectory) => {

    console.log(path);

    var splitted = path.split('/');
    var filepath = rootPath + (fileDirectory || '') + splitted[splitted.length - 1]; // to prevent relative path

    return filepath;
};

const launchApp = (command, args) => {

    console.log(command, args);
    args = args ? args.split(' ') : null;
    spawn(command, args);
};

app.get('/', function (req, res) {
    console.log(req.path);
    res.sendfile(rootPath + 'index.html');
});

app.get('/node_modules/angular/angular.js', function(req, res) {
    res.sendfile('node_modules/angular/angular.js');
});

app.get('/*.js', (req, res) => {
    res.sendfile(stripFileName(req.path));
});

app.get('/*.css', function (req, res) {
    res.sendfile(stripFileName(req.path));
});

app.get('/img/*.png', function (req, res) {
    res.sendfile(stripFileName(req.path, imgPath));
});

io.on('connection', (socket) => {

    console.log('client connected');

    socket.on('mouseMove', (point) => {
        console.log(point);
        mouse.moveBy(point.x, point.y);
    });

    socket.on('media', (key) => {
        console.log(key);
        media[key]();
    });

    socket.on('keyPress', (key) => {
        keyboard.keyPress(key);
    });

    socket.on('changeLanguageWindows', keyboard.changeLanguageWindows);

    socket.on('mouseClick', mouse.click);
    socket.on('mouseDoubleClick', mouse.doubleClick);
    socket.on('mouseRightClick', mouse.rightClick);

    socket.on('kodi', () => {
        launchApp('C:/Program Files (x86)/Kodi/Kodi.exe');
    });

    socket.on('youtube', () => {
        console.log('youtube');
        launchApp(browserPath, 'http://youtube.com');
    });

    socket.on('ynet', () => {
        launchApp(browserPath, 'http://ynet.co.il');
    });
});

http.listen(port, () => {
    console.log('listening on *:3000');
});