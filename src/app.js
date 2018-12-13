define([
  'src/constants/colors.js',
  'createjs'
], function (Colors) {
  var stage;

  var startGame = function () {
    stage.removeAllChildren();
    var firstScene = 0;
    SceneSwitcher.goto(firstScene);
  };

  function createStartMenu(stage) {
    var startText = new createjs.Text("Start Game", "32px monospace", Colors.MENU_COLOR);
    var bounds = startText.getBounds();
    startText.x = stage.canvas.width / 2 - bounds.width / 2;
    startText.y = stage.canvas.height / 2 -  bounds.height / 2;
    startText.textBaseline = "middle";
    startText.shadow = new createjs.Shadow(Colors.MENU_SHADOW_COLOR, 2, 2, 50);
    startText.addEventListener("click", startGame);
    return startText;
  }

  var initApp = function () {
    stage = new createjs.Stage("demoCanvas");
    // 重新缩放 Canvas
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    var text = createStartMenu(stage);

    stage.addChild(text);
    stage.update();

    if (window.mConfig.debug) {
      createjs.Tween.get().wait(200).call(startGame);
    }
  };

  return {
    initApp: initApp
  };
});
