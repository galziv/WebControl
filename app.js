const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const spawn = require('child_process').spawn;
const fs = require('fs');

const configuration = JSON.parse(fs.readFileSync('configuration.json', 'utf8'));

const port = configuration.port;
const browserPath = configuration.browserPath;
const kodiPath = configuration.kodiPath;

const mouse = require('./mouse');
const media = require('./media');
const keyboard = require('./keyboard');

const rootPath = 'wepapp/';
const imgPath = 'img/';

const stripFileName = (path, fileDirectory) => {

    var splitted = path.split('/');
    var filepath = rootPath + (fileDirectory || '') + splitted[splitted.length - 1]; // to prevent relative path

    return filepath;
};

const launchApp = (command, args) => {

    console.log(command, args);
	
		args = args ? args.split(' ') : [''];
		spawn(command, args);	
};

const logAction = (action) => {
    
    if (configuration.logActions) {
        console.log(action);
    }
};

const logRequests = (req) => {

    if (configuration.logRequests) {
        console.log(req);
    }
};

const sendFileOptions = { root: __dirname + '/' };

console.log(JSON.stringify(configuration) + '\n');

app.get('/', function (req, res) {
    logRequests(req.path);
    res.sendFile(rootPath + 'index.html', sendFileOptions);
});

app.get('/node_modules/angular/angular.js', function (req, res) {
    logRequests(req.path);
    res.sendFile('node_modules/angular/angular.js', sendFileOptions);
});

app.get('/*.js', (req, res) => {
    logRequests(req.path);
    res.sendFile(stripFileName(req.path), sendFileOptions);
});

app.get('/*.css', function (req, res) {
    logRequests(req.path);
    res.sendFile(stripFileName(req.path), sendFileOptions);
});

app.get('/img/*.png', function (req, res) {
    logRequests(req.path);
    res.sendFile(stripFileName(req.path, imgPath), sendFileOptions);
});

io.on('connection', (socket) => {

    console.log('client connected');

    socket.on('mouseMove', (point) => {
        logAction(point);
        mouse.moveBy(point.x, point.y);
    });

    socket.on('media', (key) => {
        logAction(key);
        media[key]();
    });

    socket.on('keyPress', (key) => {
        logAction('keyPress');
        keyboard.keyPress(key);
    });

    socket.on('changeLanguageWindows', () => {

        logAction('changeLanguageWindows');
        keyboard.changeLanguageWindows();
    });

    socket.on('mouseClick', () => {

        logAction('mouseClick');
        mouse.click();
    });

    socket.on('mouseDoubleClick', () => {

        logAction('mouseDoubleClick');
        mouse.doubleClick();
    });

    socket.on('mouseRightClick', () => {

        logAction('mouseRightClick');
        mouse.rightClick();
    });

    socket.on('kodi', () => {
        launchApp(kodiPath);
    });

    socket.on('youtube', () => {
        logAction('youtube');
        launchApp(browserPath, 'http://youtube.com');
    });

    socket.on('ynet', () => {
        logAction('ynet');
        launchApp(browserPath, 'http://ynet.co.il');
    });
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});