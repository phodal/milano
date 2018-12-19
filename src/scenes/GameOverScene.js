define([
  'createjs'
], function () {
  var stage, stageWidth, stageHeight;
  var endText = '要什么自行车？？';

  function GameOverScene(data) {
    stage = new createjs.Stage('demoCanvas');
    createjs.Touch.enable(stage);

    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;

    if (data && data.endText) {
      endText = data.endText;
    }
  }

  GameOverScene.prototype.start = function () {
    var keyContainer = new createjs.Container();
    var background = new createjs.Shape();
    background.graphics
      .beginFill("#000000")
      .drawRect(0, 0, stageWidth, stageHeight);
    keyContainer.addChild(background);

    stage.addChild(keyContainer);

    var gameOverText = new createjs.Text("Game Over!", "48px monospace", "#ffffff");
    gameOverText.x = stageWidth / 2;
    gameOverText.y = stageHeight / 2;
    gameOverText.textAlign = "center";
    gameOverText.textBaseline = "middle";

    var tipText = new createjs.Text(endText, "24px monospace", "#ffffff");
    tipText.x = stageWidth / 2;
    tipText.y = stageHeight / 2 + 48;
    tipText.textAlign = "center";
    tipText.textBaseline = "middle";

    keyContainer.addChild(tipText);
    keyContainer.addChild(gameOverText);

    stage.addChild(keyContainer);
    createjs.Ticker.on('tick', handleTick);
  };

  function handleTick(event) {
    stage.update();
  }

  function restartGame() {
    
  }
  
  return GameOverScene;
});
