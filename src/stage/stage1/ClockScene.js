define([
  'createjs'
], function () {
  var stage, timeText, clockText, stopClockText, stopButtonContainer, keyContainer;
  var stageWidth, stageHeight, resizeRatio = 6;

  function ClockScene(s) {
    stage = s;
    keyContainer = new createjs.Container();

    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;

    timeText = new createjs.Text("1", "24px monospace", "#ffffff");
    timeText.textBaseline = 'middle';
    timeText.textAlign = 'middle';

    clockText = new createjs.Text("闹钟", "40px monospace", "#ffffff");
    clockText.textAlign = 'middle';
    clockText.textBaseline = "middle";

    stopClockText = new createjs.Text("停止闹钟", "16px monospace", "#ffffff");
    stopClockText.textAlign = "center";
    stopClockText.textBaseline = "middle";

    stopButtonContainer = new createjs.Container();
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
    timeText.y = stage.canvas.height / 6 + 50;
    timeText.text = theHours + ":" + theMinutes + ":" + theSeconds;

    keyContainer.x = keyContainer.x + (Math.random() * 3 + 1) * (Math.random() * 2 > 1 ? 1 : -1);
    keyContainer.y = keyContainer.y + (Math.random() * 3 + 1) * (Math.random() * 2 > 1 ? 1 : -1);
  };

  ClockScene.prototype.action = function () {
    var background = new createjs.Shape();
    background.graphics.beginFill("#000000").drawRect(stageWidth / resizeRatio, stageHeight / resizeRatio,
      stageWidth * 2 / 3, stageHeight * 2 / 3);
    keyContainer.addChild(background);

    var clockBounds = clockText.getBounds();
    clockText.x = stage.canvas.width / 2 - clockBounds.width / 2;
    clockText.y = stage.canvas.height / 2 - clockBounds.height / 2;

    stopClockText.x = 50;
    stopClockText.y = 20;

    var buttonBg = new createjs.Shape();
    buttonBg.name = "buttonBg";
    buttonBg.graphics
      .beginFill('#bcbcbc')
      .drawRoundRect(0, 0, 100, 40, 20);

    stopButtonContainer.name = "stopClockButton";
    stopButtonContainer.x = stage.canvas.width / 2 - 50;
    stopButtonContainer.y = stage.canvas.height * 5 / resizeRatio - 100;
    stopButtonContainer.addChild(buttonBg, stopClockText);

    keyContainer.addChild(stopButtonContainer);

    keyContainer.addChild(timeText);
    keyContainer.addChild(clockText);

    stage.addChild(keyContainer);

    return keyContainer;
  };

  return ClockScene;
});
