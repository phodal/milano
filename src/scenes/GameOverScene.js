define([
  'createjs'
], function () {
  var stage, stageWidth, stageHeight;
  var END_TEXT = '要什么自行车？？';

  function GameOverScene() {
    stage = new createjs.Stage('demoCanvas');
    createjs.Touch.enable(stage);

    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;
  }

  GameOverScene.prototype.start = function () {
    var keyContainer = new createjs.Container();
    var background = new createjs.Shape();
    background.graphics
      .beginFill("#000000")
      .drawRect(0, 0, stageWidth, stageHeight);
    keyContainer.addChild(background);

    stage.addChild(keyContainer);

    var gameOverText = new createjs.Text("Game Over!", "36px monospace", "#ffffff");
    gameOverText.x = stageWidth / 2;
    gameOverText.y = stageHeight / 2;
    gameOverText.textAlign = "center";
    gameOverText.textBaseline = "middle";

    keyContainer.addChild(gameOverText);

    stage.addChild(keyContainer);
    createjs.Ticker.on('tick', handleTick);
  };

  function handleTick(event) {
    stage.update();
  }

  return GameOverScene;
});
