var robot = require("robotjs");

var mouse = {
    moveBy: function (x, y) {
        var point = robot.getMousePos();
        robot.moveMouse(point.x + x, point.y + y);
    },
    click: function() {
        robot.mouseClick();
    },
    rightClick: function() {
        robot.mouseClick('right')  
    },
    doubleClick: function() {
        robot.mouseClick('left', true);
    }
}

module.exports = mouse;