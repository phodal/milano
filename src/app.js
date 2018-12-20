define([
  'src/constants/colors.js',
  'createjs'
], function (Colors) {
  var stage;

  var startGame = function () {
    stage.removeAllChildren();
    var firstScene = 0;
    SceneDispatcher.goto(firstScene);
  };

  function createStartMenu(stage) {
    var background = new createjs.Shape();
    background.name = "background";
    background.graphics
      .setStrokeStyle(1)
      .beginStroke(Colors.MENU_COLOR)
      .beginFill('#ffffff')
      .drawRoundRect(0, 0, 300, 60, 5);

    var label = new createjs.Text("Start Game", "32px monospace", Colors.MENU_COLOR);
    label.name = "label";
    label.textAlign = "center";
    label.textBaseline = "middle";
    label.x = 300 / 2;
    label.y = 60 / 2;

    var button = new createjs.Container();
    button.name = "button";
    button.x = stage.canvas.width / 2 - 300 / 2;
    button.y = stage.canvas.height / 2 - 60 / 2;
    button.addChild(background, label);
    stage.addChild(button);

    background.onClick = label.onClick = startGame;
    button.onClick = startGame;

    button.addEventListener('click', startGame);
  }

  var initApp = function () {
    stage = new createjs.Stage("demoCanvas");
    // 重新缩放 Canvas
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    createStartMenu(stage);
    stage.update();

    if (window.mConfig.debug) {
      createjs.Tween.get().wait(200).call(startGame);
    }

    createjs.Ticker.on('tick', function () {
      stage.update();
    });
  };

  return {
    initApp: initApp
  };
});
