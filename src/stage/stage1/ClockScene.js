define([
  'src/constants/colors.js',
  'createjs'
], function (COLORS) {
  var stage, timeText, clockText, stopClockText, stopButton;

  function ClockScene(s) {
    stage = s;
    timeText = new createjs.Text("1", "32px monospace", "#ffffff");
    timeText.textBaseline = 'middle';

    clockText = new createjs.Text("闹钟", "48px monospace", "#ffffff");
    clockText.textBaseline = 'middle';

    stopClockText = new createjs.Text("停止闹钟", "24px monospace", "#ffffff");
    stopClockText.textBaseline = 'middle';

    stopButton = new createjs.Container();
  }

  ClockScene.prototype.tick = function (event) {
    var myTime = new Date();
    var theSeconds = myTime.getSeconds();
    var theMinutes = myTime.getMinutes();
    var theHours = myTime.getHours();

    if (theHours >= 13) {
      theHours = theHours - 12;
    }

    if (theHours === 0) {
      theHours = theHours + 12;
    }

    if (String(theHours).length === 1) {
      theHours = "0" + theHours;
    }

    if (String(theMinutes).length === 1) {
      theMinutes = "0" + theMinutes;
    }

    if (String(theSeconds).length === 1) {
      theSeconds = "0" + theSeconds;
    }

    var bounds = timeText.getBounds();
    timeText.x = stage.canvas.width / 2 - bounds.width / 2;
    timeText.y = 100;
    timeText.text = theHours + ":" + theMinutes + ":" + theSeconds;
  };

  ClockScene.prototype.action = function () {
    var keyContainer = new createjs.Container();
    var background = new createjs.Shape();
    background.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    keyContainer.addChild(background);

    var clockBounds = clockText.getBounds();
    clockText.x = stage.canvas.width / 2 - clockBounds.width / 2;
    clockText.y = stage.canvas.height / 2 - clockBounds.height / 2;

    var stopClockBounds = stopClockText.getBounds();
    stopClockText.x = stage.canvas.width / 2 - stopClockBounds.width / 2;
    stopClockText.y = stage.canvas.height - 100;

    stage.addChild(keyContainer);
    stage.addChild(timeText);
    stage.addChild(clockText);
    stage.addChild(stopClockText);
  };

  return ClockScene;
});
