define([
  'createjs'
], function () {
  var stage, clockText;

  function ClockScene(s) {
    stage = s;
    clockText = new createjs.Text("123", "48px monospace", "#ffffff");
    clockText.textBaseline = 'middle';
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

    var bounds = clockText.getBounds();
    clockText.x = stage.canvas.width / 2 - bounds.width / 2;
    clockText.y = 100;
    clockText.text = theHours + ":" + theMinutes + ":" + theSeconds;
  };

  ClockScene.prototype.action = function () {
    var keyContainer = new createjs.Container();
    var background = new createjs.Shape();
    background.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    keyContainer.addChild(background);

    stage.addChild(keyContainer);
    stage.addChild(clockText);
  };

  return ClockScene;
});
